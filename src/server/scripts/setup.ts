import { db } from "~/server/db";
import { minioClient } from "~/server/minio";

async function setup() {
  // Set up MinIO bucket for blog images
  const bucketName = "blog";
  const bucketExists = await minioClient.bucketExists(bucketName);
  
  if (!bucketExists) {
    await minioClient.makeBucket(bucketName, "us-east-1");
    console.log(`Created bucket: ${bucketName}`);
  }

  // Set bucket policy to allow public read access for public/* prefix
  const policy = {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: { AWS: ["*"] },
        Action: ["s3:GetObject"],
        Resource: [`arn:aws:s3:::${bucketName}/public/*`],
      },
    ],
  };

  await minioClient.setBucketPolicy(bucketName, JSON.stringify(policy));
  console.log(`Set public read policy for bucket: ${bucketName}`);

  // Seed the two SEO blog articles
  const articles = [
    {
      slug: "how-to-buy-in-silicon-valley-2025",
      titleEn: "How to Buy a Home in Silicon Valley in 2025: A Complete Guide for First-Time Buyers",
      titleZh: "2025 年硅谷买房完整指南：首次购房者必读",
      keywords: "Silicon Valley homes, Bay Area real estate, first-time buyer guide, buying a house in 2025",
      category: "buying-tips",
      publishDate: new Date("2025-01-15"),
      excerptEn: "Buying a home in Silicon Valley has never been easy — but with the right preparation and guidance, 2025 remains one of the best years for buyers to enter the market.",
      excerptZh: "在硅谷买房从来都不容易，但 2025 年对于首次购房者来说反而是一个不错的机会。价格稳定、库存增加、利率趋于平稳，让市场更具可操作性。",
      contentEn: `Buying a home in Silicon Valley has never been easy — but with the right preparation and guidance, 2025 remains one of the best years for buyers to enter the market. Prices have stabilized in many neighborhoods, more inventory is coming online, and interest rates are projected to settle.

## Why Silicon Valley Is Still a Strong Market

Silicon Valley's housing demand continues to be driven by:

- High-income tech workforce
- Limited land supply
- Strong rental demand
- Global investment interest

Even during market fluctuations, core cities like Palo Alto, Mountain View, Sunnyvale, and Cupertino maintain long-term appreciation.

## Step 1: Get Pre-Approved Early

Pre-approval gives you:

- A clear budget
- Stronger negotiating power
- Faster offer submission

In competitive markets, sellers won't consider buyers without solid pre-approval documentation.

## Step 2: Understand Neighborhood Differences

Not all Silicon Valley cities move the same. For example:

- **Palo Alto** → best schools, highest price stability
- **San Jose Willow Glen** → family-friendly, strong value
- **Fremont** → top schools at lower cost
- **Milpitas** → excellent commute locations for tech hubs

Your realtor should explain micro-market patterns and appreciation forecasts.

## Step 3: Work With a Negotiator Who Knows the Market

In Silicon Valley, winning the home often depends on:

- Understanding seller motivation
- Structuring competitive but safe offers
- Identifying hidden property issues
- Strong realtor communication skills

A top agent can save buyers tens of thousands of dollars — or help you avoid buying the wrong home.

## Conclusion

Buying a home in Silicon Valley in 2025 is possible with the right preparation and an experienced agent. With stable pricing and increasing inventory, now is a strategic time for first-time buyers to enter the market.`,
      contentZh: `在硅谷买房从来都不容易，但 2025 年对于首次购房者来说反而是一个不错的机会。价格稳定、库存增加、利率趋于平稳，让市场更具可操作性。

## 为什么硅谷仍然值得投资

硅谷的住房需求持续由以下因素驱动：

- 科技行业高收入人群
- 土地稀缺
- 租赁市场强劲
- 海外买家兴趣浓厚

即使在市场波动期间，Palo Alto、Mountain View、Sunnyvale 和 Cupertino 等核心城市仍具有长期保值增值能力。

## 第一步：尽早获得预批准

预批准可以为您提供：

- 明确的预算
- 更强的谈判能力
- 更快的报价提交

在竞争激烈的市场中，卖家不会考虑没有可靠预批准文件的买家。

## 第二步：了解社区差异

并非所有硅谷城市的市场走势都相同。例如：

- **Palo Alto** → 最好的学校，最高的价格稳定性
- **San Jose Willow Glen** → 适合家庭，性价比高
- **Fremont** → 顶级学校，成本较低
- **Milpitas** → 科技中心的绝佳通勤地点

您的房地产经纪人应该解释微观市场模式和升值预测。

## 第三步：与了解市场的谈判专家合作

在硅谷，赢得房屋往往取决于：

- 了解卖家动机
- 制定有竞争力但安全的报价
- 识别隐藏的房产问题
- 强大的经纪人沟通技巧

顶级经纪人可以为买家节省数万美元，或帮助您避免购买错误的房屋。

## 结论

在 2025 年，通过正确的准备和经验丰富的经纪人，在硅谷买房是可能的。随着价格稳定和库存增加，现在是首次购房者进入市场的战略时机。`,
      thumbnailUrl: "/modern-minimalist-living-room.jpg",
    },
    {
      slug: "top-5-tips-to-sell-bay-area-home",
      titleEn: "Top 5 Tips to Sell Your Bay Area Home Fast — and for a Better Price",
      titleZh: "湾区快速卖房的 5 个关键技巧，让房子更快卖、更高价卖",
      keywords: "sell home Bay Area, real estate tips, staging tips, selling fast, Silicon Valley real estate",
      category: "selling-strategies",
      publishDate: new Date("2025-01-20"),
      excerptEn: "Selling a home in the Bay Area requires strategy. Even in a strong market, homes that are positioned correctly sell faster and for significantly better prices.",
      excerptZh: "在湾区卖房需要策略。即使市场强劲，定位正确的房屋依然会卖得更快、价格更好。以下 5 个方法已经在上百个真实案例中验证有效。",
      contentEn: `Selling a home in the Bay Area requires strategy. Even in a strong market, homes that are positioned correctly sell faster and for significantly better prices. Here are five proven tips to maximize your sale.

## 1. Price Strategically, Not Emotionally

Overpricing reduces buyer interest. Underpricing leaves money on the table. Use real comparable data, market trends, and professional pricing analysis to determine the optimal list price.

## 2. Invest in High-Impact Upgrades

Small improvements often deliver the highest ROI:

- Fresh paint
- Modern light fixtures
- Landscaping refresh
- Updated hardware

These changes enhance the buyer's first impression and increase emotional appeal.

## 3. Stage the Home Professionally

Staged homes sell:

- Faster
- With higher offers
- With more competitive bidding

Buyers need to imagine living in the space — staging helps them emotionally attach.

## 4. Advertise on Bilingual Channels (English + Chinese)

Bay Area buyer pools are diverse. Effective marketing includes:

- Zillow
- Redfin
- YouTube home tours
- WeChat
- Xiaohongshu (RED)
- Bay Area real estate forums

Reaching both local and international audiences improves exposure dramatically.

## 5. Work With an Agent with Proven Negotiation Results

The right agent can negotiate:

- Higher selling prices
- Reduced contingencies
- More favorable timelines

Experience matters greatly in Bay Area transactions.`,
      contentZh: `在湾区卖房需要策略。即使市场强劲，定位正确的房屋依然会卖得更快、价格更好。以下 5 个方法已经在上百个真实案例中验证有效：

## 1. 战略定价，而非情感定价

定价过高会减少买家兴趣。定价过低会损失金钱。使用真实的可比数据、市场趋势和专业定价分析来确定最佳挂牌价格。

## 2. 投资高影响力的升级

小的改进通常能带来最高的投资回报率：

- 刷新油漆
- 现代化灯具
- 景观美化
- 更新五金件

这些改变增强了买家的第一印象并增加情感吸引力。

## 3. 专业布置房屋

经过布置的房屋：

- 卖得更快
- 获得更高的报价
- 有更多的竞争性出价

买家需要想象自己住在这个空间里——布置帮助他们产生情感联系。

## 4. 在双语渠道上做广告（英文 + 中文）

湾区买家群体多元化。有效的营销包括：

- Zillow
- Redfin
- YouTube 房屋视频
- 微信
- 小红书
- 湾区房地产论坛

覆盖本地和国际受众可以显著提高曝光率。

## 5. 与拥有成熟谈判成果的经纪人合作

合适的经纪人可以谈判：

- 更高的售价
- 减少的或有条款
- 更有利的时间表

在湾区交易中，经验非常重要。`,
      thumbnailUrl: "/professional-office-scene.jpg",
    },
    {
      slug: "bay-area-school-district-ultimate-guide",
      titleEn: "Bay Area School District Home Buying Ultimate Guide",
      titleZh: "湾区学区房终极购买指南",
      keywords: "Bay Area school district, Silicon Valley schools, school home buying, Redwood City schools, Saratoga schools, San Jose schools, Milpitas schools, school district premium, school zone strategy",
      category: "buying-tips",
      publishDate: new Date("2025-12-13"),
      excerptEn: "A practical, data-driven guide to buying school district homes in the Bay Area without overpaying. This article explains boundaries, pricing premiums, local trade-offs, common mistakes, and a clear decision framework.",
      excerptZh: "一篇以数据与理性决策为核心的湾区学区房购买指南,解析学区溢价逻辑、区域差异与常见误区,并提供可落地的决策框架,覆盖 Redwood City、Saratoga、San Jose 95124 与 Milpitas 等核心区域。",
      contentEn: `![](https://statics.myquickcreator.com/upload/aaacpn54rh4blatw/2025/12/13/image.jpg)

# Bay Area School District Guide: How to Buy the Right School Home Without Overpaying

Meta description: A practical, data-driven guide to Bay Area school district homes—pricing logic, local trade-offs, common mistakes, and strategies to buy confidently.

---

## Why "School District" Is Not One Simple Number

In Silicon Valley and the Bay Area, school district is often a top driver of demand—but "good schools" is not a single metric. Prices reflect a combination of:

- District boundaries and attendance zones  
- Perceived school ranking trends  
- Commute patterns and neighborhood desirability  
- Inventory scarcity in specific micro-markets  
- Buyer composition (move-up families vs. investors vs. HNW buyers)

**Key idea:** you are not just buying a "school." You're buying into a **bundle of value signals** that the market prices in.

---

## Step 1 — Start With Your Decision Framework (Not the Rankings)

Instead of starting with "Top 10 schools," start with constraints:

### 1) Non-negotiables
- Budget range
- Desired home type (SFH vs townhouse)
- Commute radius
- Must-have school level (elementary vs high school)

### 2) Trade-offs you accept
- Smaller home in a premium zone vs. bigger home in a slightly lower-ranked zone
- Older home with renovation potential vs. newer home further out
- Peninsula pricing vs. South Bay value

This prevents you from getting trapped in "ranking chasing."

---

## Step 2 — Understand the Pricing Mechanics of School Zones

School district premiums usually show up in:

- Higher price per square foot  
- More aggressive bidding (especially in spring)  
- Lower days on market  
- Stronger long-term price stability

But the premium is not always "worth it" depending on the buyer's horizon.

### Practical rule of thumb
- **Short horizon (0–3 years):** be cautious. The premium may not pay back.
- **Medium horizon (3–7 years):** premium zones can stabilize and protect downside.
- **Long horizon (7+ years):** the premium often becomes part of the comp baseline.

---

## Step 3 — Local Trade-offs (Redwood City → Saratoga → San Jose 95124 → Milpitas)

Below are examples of how real buyers think, not "one-size-fits-all rankings."

### Redwood City (Peninsula access + mixed school dynamics)
- Strong upside from proximity to tech corridors and commute convenience  
- School boundaries can be nuanced; micro-location matters  
- Great for buyers prioritizing Peninsula access and long-term appreciation

### Saratoga (premium scarcity + strong school signal)
- Extremely tight inventory  
- Strong willingness-to-pay from high-income buyers  
- Often ideal for buyers with long horizon and school-first priorities

### San Jose 95124 (move-up sweet spot)
- Popular for move-up families seeking strong schools relative to price  
- More inventory depth than ultra-premium pockets  
- Good balance of lifestyle, price logic, and school demand

### Milpitas (commute leverage + value positioning)
- Strong for buyers seeking value and commute convenience  
- School perception has improved with market cycles  
- Often a "smart trade-off" zone for budget + upside

---

## Step 4 — Common Mistakes School-Home Buyers Make

### Mistake 1: Over-bidding without value guardrails  
If you don't define a ceiling based on comps and risk, the "school premium" becomes infinite.

### Mistake 2: Ignoring zone boundary details  
Two houses 3 minutes apart can have different school assignments.

### Mistake 3: Assuming rankings are stable forever  
School performance and perception evolve. Treat rankings as a snapshot, not destiny.

### Mistake 4: Buying a "perfect school" but a problematic property  
Foundation, layout, lot constraints, or resale limitations can outweigh school benefits.

---

## Step 5 — A Data-Driven Strategy to Avoid Overpaying

Use a three-layer approach:

1) **Comp-based valuation range**  
2) **Premium justification** (what exactly are you paying extra for?)  
3) **Exit plan clarity** (how will this home perform when you sell?)

If you can't explain these three, you're making an emotional decision.

---

## Step 6 — What to Do Next

If your goal is to buy a school home **without overpaying**, the smartest next step is to map your requirements onto micro-markets and compare:

- pricing premium vs. school signal
- inventory depth
- resale risk
- renovation potential

If you want, you can request a school-home strategy consult or subscribe to Bay Area market and school district updates.`,
      contentZh: `![](https://statics.myquickcreator.com/upload/aaacpn54rh4blatw/2025/12/13/image.jpg)

# 湾区学区房购买指南：如何在不盲目加价的情况下做出正确选择

Meta description：一篇以数据与理性决策为核心的湾区学区房指南,涵盖定价逻辑、区域权衡、常见误区与更稳健的购买策略。

---

## 为什么"学区"不是一个简单数字

在硅谷与湾区,学区往往是需求最重要的驱动因素之一,但"好学校"并不是单一指标。房价通常反映了多种因素的综合结果,包括:

- 学区边界与入学划片(attendance zones)  
- 学校排名与口碑的趋势变化  
- 通勤便利性与社区宜居度  
- 某些微型市场(micro-market)的房源稀缺程度  
- 买家结构(换房家庭 vs 投资者 vs 高净值买家)

**关键点:**你买的不只是"一所学校",而是一组被市场共同定价的**价值信号组合**。

---

## 第一步:先建立你的决策框架(而不是先追排名)

与其从"前十名学校"开始,不如先从约束条件开始:

### 1)不可妥协条件
- 预算区间  
- 房型偏好(独栋 SFH vs 联排 townhouse)  
- 可接受的通勤半径  
- 必须满足的学段(小学 vs 高中)

### 2)你愿意接受的权衡
- 核心学区小房子 vs 略弱学区大房子  
- 老房子但改造潜力大 vs 新房子但更远  
- 半岛高溢价 vs 南湾更高性价比

这样做能避免你陷入"追排名"的循环。

---

## 第二步:理解学区溢价是如何体现在价格里的

学区溢价通常体现在:

- 更高的每平方英尺价格(price per square foot)  
- 更激烈的竞价(尤其在春季)  
- 更短的平均上市天数(days on market)  
- 更强的长期价格稳定性

但溢价是否"值得",高度取决于你的持有周期与计划。

### 实用经验法则
- **短期(0–3 年):**需谨慎,溢价未必能回本。  
- **中期(3–7 年):**优质学区往往更能稳住价格、降低下行风险。  
- **长期(7 年以上):**溢价更容易成为周边成交对比中的"基准"部分。

---

## 第三步:区域权衡(Redwood City → Saratoga → San Jose 95124 → Milpitas)

下面是更贴近真实买家思维的比较,而不是"一刀切的排名"。

### Redwood City(半岛通勤优势 + 学区结构更复杂)
- 靠近科技走廊与通勤便利,长期增值逻辑较强  
- 学区边界更细碎,微位置差异会显著影响入学与价格  
- 适合重视半岛通勤与长期资产表现的买家

### Saratoga(高端稀缺 + 强学区信号)
- 库存极其紧张  
- 高收入买家支付意愿强,竞争常态化  
- 更适合学区优先、且持有周期较长的家庭

### San Jose 95124(换房家庭的"甜蜜点")
- 很多换房家庭在这里寻找"相对价格更合理的强学区"  
- 相比超高端板块,房源供给更有深度  
- 在生活便利、价格逻辑与学区需求之间更均衡

### Milpitas(通勤杠杆 + 价值定位)
- 对预算敏感、重视通勤效率的买家常把这里作为优选  
- 市场对学区的认知会随周期变化而改善  
- 往往是"权衡后很聪明"的选择:预算可控、仍有上行空间

---

## 第四步:学区房买家最常见的误区

### 误区 1:没有价值上限就盲目加价  
如果你不基于成交对比与风险设定出价上限,"学区溢价"就会变成无限大。

### 误区 2:忽略划片边界细节  
两套房子可能只差 3 分钟路程,但对应的学校却完全不同。

### 误区 3:把排名当成永恒真理  
学校表现与口碑会变化。排名是快照,不是命运。

### 误区 4:只盯学区,忽视房屋本体问题  
地基、户型、地块限制、未来转手难度等,可能比学区带来的优势更关键。

---

## 第五步:用数据与逻辑避免"买贵了"

建议采用三层验证方法:

1)**基于成交对比的合理估值区间**  
2)**溢价理由拆解**(你究竟在为哪些价值点多付钱?)  
3)**退出路径清晰度**(未来卖出时,这套房子的表现如何?)

如果你无法清楚解释这三点,那么你很可能是在做情绪化决策。

---

## 第六步:下一步怎么做

如果你的目标是**买到学区房但不盲目加价**,最聪明的下一步是把你的需求映射到微型市场,并系统对比:

- 学区信号与价格溢价的匹配度  
- 房源供给深度  
- 转售风险  
- 改造潜力

如果你愿意,你也可以申请一次学区房策略梳理,或订阅湾区市场与学区更新。`,
      thumbnailUrl: "https://statics.myquickcreator.com/upload/aaacpn54rh4blatw/2025/12/13/image.jpg",
      headerImage: "https://statics.myquickcreator.com/upload/aaacpn54rh4blatw/2025/12/13/image.jpg",
    },
  ];

  for (const article of articles) {
    await db.blogPost.upsert({
      where: { slug: article.slug },
      update: {},
      create: article,
    });
  }

  console.log("Blog articles seeded successfully");

  // Seed homepage videos
  const videos = [
    // Buying category
    {
      titleEn: '10 Critical Issues Every Homebuyer Must Know Before Buying',
      titleZh: '买房前一定要知道的十大「硬伤」',
      videoUrl: 'https://www.youtube.com/watch?v=NOgVKJ7cou0',
      category: 'buying',
      coverImageUrl: '/house-buying-pitfalls-video.jpg',
      duration: '25:08',
      views: '15K',
      displayOrder: 1,
    },
    {
      titleEn: '10 Critical Issues Every Homebuyer Must Know — Part 2',
      titleZh: '买房前一定要知道的十大「硬伤」2',
      videoUrl: 'https://www.youtube.com/watch?v=0_P7vZW5c1w',
      category: 'buying',
      coverImageUrl: '/real-estate-pitfalls-video.jpg',
      duration: '20:27',
      views: '13K',
      displayOrder: 2,
    },
    {
      titleEn: 'Silicon Valley Move-Up Strategy — From Small to Bigger Homes',
      titleZh: '硅谷升级换房 · 小换大',
      videoUrl: 'http://youtube.com/watch?v=Do0XreixpgM',
      category: 'buying',
      coverImageUrl: '/real-estate-key-exchange.jpg',
      duration: '10:34',
      views: '4K',
      displayOrder: 3,
    },
    // Selling category
    {
      titleEn: 'A Real Case Study: Renovate & Sell a Home in Milpitas',
      titleZh: 'Milpitas 房屋翻新后出售全过程真实呈现',
      videoUrl: 'https://www.youtube.com/watch?v=bLhph7sbDRM',
      category: 'selling',
      coverImageUrl: '/house-flip-guide-thumbnail.jpg',
      duration: '14:17',
      views: '11K',
      displayOrder: 1,
    },
    {
      titleEn: 'You Could Lose $400K Without Knowing This — Must-Watch for Bay Area Sellers',
      titleZh: '你可能一不小心损失了 40 万！2022 湾区卖房前必看',
      videoUrl: 'https://www.youtube.com/watch?v=lXfAACzgmyc',
      category: 'selling',
      coverImageUrl: '/home-renovation-thumbnail.jpg',
      duration: '8:04',
      views: '26K',
      displayOrder: 2,
    },
    {
      titleEn: 'Silicon Valley Move-Up Strategy — From Small to Bigger Homes',
      titleZh: '硅谷升级换房 · 小换大',
      videoUrl: 'http://youtube.com/watch?v=Do0XreixpgM',
      category: 'selling',
      coverImageUrl: '/real-estate-key-exchange.jpg',
      duration: '10:34',
      views: '4K',
      displayOrder: 3,
    },
    // Tips category
    {
      titleEn: 'California Housing Market Outlook 2025 — Key Trends Explained',
      titleZh: '加州 2025 年楼市趋势预测！看完恍然大悟！',
      videoUrl: 'https://www.youtube.com/watch?v=JfOvFq0XNIc',
      category: 'tips',
      coverImageUrl: '/la-real-estate-2025-trends.jpg',
      duration: '8:18',
      views: '46K',
      displayOrder: 1,
    },
    {
      titleEn: 'Sunnyvale, Silicon Valley — Area & Neighborhood Overview',
      titleZh: '硅谷 Sunnyvale 地区讲解',
      videoUrl: 'https://www.youtube.com/watch?v=-oKuUmBuhxA',
      category: 'tips',
      coverImageUrl: '/sunnyvale-vintage-mix.jpg',
      duration: '10:15',
      views: '1K',
      displayOrder: 2,
    },
    {
      titleEn: 'San Francisco\'s Decline & Possible Revival — Why People Are Leaving the City',
      titleZh: '沉沦旧金山的复兴，曾经的华人天堂，为何人们纷纷搬离旧金山？',
      videoUrl: 'https://www.youtube.com/watch?v=v30OwaNbjyE',
      category: 'tips',
      coverImageUrl: '/cityscape-surprise-thumbnail.jpg',
      duration: '8:40',
      views: '1.8K',
      displayOrder: 3,
    },
  ];

  for (const video of videos) {
    await db.video.upsert({
      where: {
        // Use a composite unique constraint based on videoUrl
        videoUrl: video.videoUrl,
      },
      update: {},
      create: video,
    });
  }

  console.log("Homepage videos seeded successfully");
}

setup()
  .then(() => {
    console.log("setup.ts complete");
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
