import {
  Outlet,
  createRootRoute,
  useRouterState,
  useLocation,
} from "@tanstack/react-router";
import React, {
  Component,
  useEffect,
  useRef,
} from "react";
import { TRPCReactProvider } from "~/trpc/react";
import { useTRPCClient } from "~/trpc/react";

export const Route = createRootRoute({
  component: RootComponent,
});

class ErrorBoundary extends Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '2rem', 
          maxWidth: '600px', 
          margin: '2rem auto',
          textAlign: 'center',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#dc2626' }}>
            Something went wrong
          </h1>
          <p style={{ marginBottom: '1.5rem', color: '#6b7280' }}>
            We're sorry, but something unexpected happened. Please try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '500'
            }}
          >
            Refresh Page
          </button>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details style={{ 
              marginTop: '2rem', 
              textAlign: 'left',
              padding: '1rem',
              backgroundColor: '#fee2e2',
              borderRadius: '0.5rem',
              border: '1px solid #fecaca'
            }}>
              <summary style={{ cursor: 'pointer', fontWeight: '600', marginBottom: '0.5rem' }}>
                Error Details (Development Only)
              </summary>
              <pre style={{ 
                overflow: 'auto', 
                fontSize: '0.875rem',
                color: '#991b1b'
              }}>
                {this.state.error.toString()}
                {'\n\n'}
                {this.state.error.stack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

function VisitorTracker() {
  const location = useLocation();
  const trpcClient = useTRPCClient();
  const hasLoggedInitialVisit = useRef(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Skip tracking for admin pages
    if (location.pathname.startsWith('/admin')) {
      return;
    }

    // Cancel any pending requests
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Get or create visitor ID
    let visitorId = '';
    try {
      visitorId = localStorage.getItem('visitor-id') || '';
      if (!visitorId) {
        visitorId = `visitor-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('visitor-id', visitorId);
      }
    } catch (error) {
      // If localStorage fails, create a session-only ID
      visitorId = `visitor-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      console.warn('Failed to access localStorage for visitor tracking:', error);
    }

    // Fetch geolocation data and log visit
    const logVisit = async () => {
      let geoData = { country: undefined, region: undefined, city: undefined };
      
      try {
        // Create abort controller with timeout
        const abortController = new AbortController();
        abortControllerRef.current = abortController;
        
        const timeoutId = setTimeout(() => {
          abortController.abort();
        }, 5000); // 5 second timeout

        try {
          const response = await fetch('https://ipapi.co/json/', {
            signal: abortController.signal,
          });
          
          clearTimeout(timeoutId);
          
          if (response.ok) {
            const data = await response.json();
            geoData = {
              country: data.country_name,
              region: data.region,
              city: data.city,
            };
          }
        } catch (fetchError) {
          // Geolocation fetch failed, continue without it
          if (fetchError instanceof Error && fetchError.name === 'AbortError') {
            console.log('Geolocation request timed out, continuing without location data');
          } else {
            console.log('Geolocation fetch failed, continuing without location data');
          }
        }

        // Log the visit (this should always succeed even if geolocation fails)
        await trpcClient.traffic.log.mutate({
          visitorId,
          country: geoData.country,
          region: geoData.region,
          city: geoData.city,
          page: location.pathname,
        });
      } catch (error) {
        // Silently fail - we don't want to break the user experience
        // Only log in development
        if (process.env.NODE_ENV === 'development') {
          console.error('Failed to log visit:', error);
        }
      }
    };

    // Log initial visit immediately, debounce subsequent route changes
    if (!hasLoggedInitialVisit.current) {
      hasLoggedInitialVisit.current = true;
      // Use a small delay even for initial visit to avoid blocking render
      timeoutRef.current = setTimeout(() => {
        logVisit().catch(() => {
          // Ensure promise rejection doesn't bubble up
        });
      }, 100);
    } else {
      // Debounce route changes to avoid too many requests
      timeoutRef.current = setTimeout(() => {
        logVisit().catch(() => {
          // Ensure promise rejection doesn't bubble up
        });
      }, 500);
    }

    // Cleanup function
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [location.pathname, trpcClient]);

  return null;
}

function RootComponent() {
  const isFetching = useRouterState({ select: (s) => s.isLoading });

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <ErrorBoundary>
      <TRPCReactProvider>
        <VisitorTracker />
        <Outlet />
      </TRPCReactProvider>
    </ErrorBoundary>
  );
}
