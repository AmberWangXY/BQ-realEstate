import { chromium } from 'playwright';
import { generateText } from 'ai';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { env } from '../env';

interface ScrapedTestimonial {
  name: string;
  location: string;
  type: 'Buyer' | 'Seller';
  text: string;
  avatar?: string;
}

interface TranslatedTestimonial extends ScrapedTestimonial {
  textZh: string;
}

export async function scrapeZillowMap(): Promise<string> {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    await page.goto('https://www.zillow.com/profile/Bill-Qin', {
      waitUntil: 'networkidle',
      timeout: 30000,
    });
    
    // Wait for the map section to load
    await page.waitForSelector('[data-testid="listings-sales-map"]', { timeout: 10000 });
    
    // Extract the map container HTML
    const mapHtml = await page.$eval('[data-testid="listings-sales-map"]', (el) => el.outerHTML);
    
    await browser.close();
    return mapHtml;
  } catch (error) {
    console.error('Error scraping Zillow map:', error);
    await browser.close();
    throw error;
  }
}

export async function scrapeBillQinTestimonials(): Promise<ScrapedTestimonial[]> {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    await page.goto('https://www.billqin.com/', {
      waitUntil: 'networkidle',
      timeout: 30000,
    });
    
    // Wait for testimonials section to load
    await page.waitForSelector('.testimonial, [class*="testimonial"], [class*="review"]', { timeout: 10000 });
    
    // Extract testimonials
    const testimonials = await page.evaluate(() => {
      const results: ScrapedTestimonial[] = [];
      
      // Try multiple selectors to find testimonials
      const testimonialElements = document.querySelectorAll(
        '.testimonial, [class*="testimonial"], [class*="review"], [data-testid*="testimonial"]'
      );
      
      testimonialElements.forEach((el) => {
        const nameEl = el.querySelector('[class*="name"], .name, h3, h4');
        const locationEl = el.querySelector('[class*="location"], .location');
        const textEl = el.querySelector('[class*="text"], .text, p');
        const avatarEl = el.querySelector('img');
        const typeEl = el.querySelector('[class*="type"], .type, .badge');
        
        if (nameEl && textEl) {
          results.push({
            name: nameEl.textContent?.trim() || '',
            location: locationEl?.textContent?.trim() || '',
            type: typeEl?.textContent?.toLowerCase().includes('buyer') ? 'Buyer' : 'Seller',
            text: textEl.textContent?.trim() || '',
            avatar: avatarEl?.getAttribute('src') || undefined,
          });
        }
      });
      
      return results;
    });
    
    await browser.close();
    return testimonials;
  } catch (error) {
    console.error('Error scraping BillQin testimonials:', error);
    await browser.close();
    throw error;
  }
}

export async function translateTestimonials(
  testimonials: ScrapedTestimonial[]
): Promise<TranslatedTestimonial[]> {
  const openrouter = createOpenRouter({ apiKey: env.OPENROUTER_API_KEY });
  const model = openrouter('openai/gpt-4o');
  
  const translatedTestimonials: TranslatedTestimonial[] = [];
  
  for (const testimonial of testimonials) {
    try {
      const { text: translatedText } = await generateText({
        model,
        system: 'You are a professional translator. Translate the following English testimonial to Chinese (Simplified). Maintain the tone and meaning accurately. Return only the translated text without any additional comments or explanations.',
        prompt: testimonial.text,
      });
      
      translatedTestimonials.push({
        ...testimonial,
        textZh: translatedText,
      });
    } catch (error) {
      console.error(`Error translating testimonial for ${testimonial.name}:`, error);
      // Fallback to original text if translation fails
      translatedTestimonials.push({
        ...testimonial,
        textZh: testimonial.text,
      });
    }
  }
  
  return translatedTestimonials;
}

export async function scrapeAndProcessContent() {
  console.log('Starting content scraping...');
  
  // Scrape Zillow map
  console.log('Scraping Zillow map...');
  const zillowMap = await scrapeZillowMap();
  console.log('Zillow map scraped successfully');
  
  // Scrape testimonials
  console.log('Scraping BillQin testimonials...');
  const testimonials = await scrapeBillQinTestimonials();
  console.log(`Scraped ${testimonials.length} testimonials`);
  
  // Translate testimonials
  console.log('Translating testimonials to Chinese...');
  const translatedTestimonials = await translateTestimonials(testimonials);
  console.log('Translation completed');
  
  return {
    zillowMap,
    testimonials: translatedTestimonials,
  };
}
