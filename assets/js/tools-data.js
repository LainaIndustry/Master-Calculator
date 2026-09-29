/* ============================================================
   TOOLS DATA REGISTRY
   Used for search, related tools, category pages, sitemap.
   Add a new tool here to make it appear everywhere.
   ============================================================ */
window.TOOLS_DATA = [
  // ---------- FINANCIAL ----------
  { name: "Loan Calculator", slug: "loan-calculator", category: "Financial",
    description: "Calculate monthly payments, total interest, and amortization for any loan.",
    related: ["auto-loan-calculator", "mortgage-payoff-calculator", "amortization-calculator", "interest-calculator"] },
  { name: "Auto Loan Calculator", slug: "auto-loan-calculator", category: "Financial",
    description: "Estimate monthly car payments including tax, title, and fees.",
    related: ["loan-calculator", "lease-calculator", "interest-calculator"] },
  { name: "Interest Calculator", slug: "interest-calculator", category: "Financial",
    description: "Compute simple or compound interest with flexible compounding.",
    related: ["compound-interest-calculator", "simple-interest-calculator", "savings-calculator"] },
  { name: "Compound Interest Calculator", slug: "compound-interest-calculator", category: "Financial",
    description: "See how your money grows with compound interest over time.",
    related: ["interest-calculator", "investment-calculator", "savings-calculator", "future-value-calculator"] },
  { name: "Mortgage Payoff Calculator", slug: "mortgage-payoff-calculator", category: "Financial",
    description: "Find out how extra payments shorten your mortgage.",
    related: ["loan-calculator", "amortization-calculator", "refinance-calculator"] },
  { name: "Amortization Calculator", slug: "amortization-calculator", category: "Financial",
    description: "Full payment schedule showing principal and interest each period.",
    related: ["loan-calculator", "mortgage-payoff-calculator", "credit-card-payoff-calculator"] },
  { name: "Investment Calculator", slug: "investment-calculator", category: "Financial",
    description: "Project the future value of investments with regular contributions.",
    related: ["compound-interest-calculator", "roi-calculator", "savings-calculator"] },
  { name: "ROI Calculator", slug: "roi-calculator", category: "Financial",
    description: "Calculate return on investment and annualized ROI.",
    related: ["investment-calculator", "irr-calculator", "payback-period-calculator"] },
  { name: "Sales Tax Calculator", slug: "sales-tax-calculator", category: "Financial",
    description: "Add or reverse sales tax for any purchase.",
    related: ["vat-calculator", "discount-calculator", "margin-calculator"] },
  { name: "Discount Calculator", slug: "discount-calculator", category: "Financial",
    description: "Find sale price and savings from any percentage discount.",
    related: ["percent-off-calculator", "sales-tax-calculator", "margin-calculator"] },
  // ... (add remaining financial tools following the same pattern)

  // ---------- MATH ----------
  { name: "Percentage Calculator", slug: "percentage-calculator", category: "Math",
    description: "Compute percentages, percentage change, and 'X is what % of Y'.",
    related: ["percent-off-calculator", "discount-calculator", "ratio-calculator", "average-calculator"] },
  { name: "Scientific Calculator", slug: "scientific-calculator", category: "Math",
    description: "Full-featured calculator with trig, log, and exponential functions.",
    related: ["basic-calculator", "log-calculator", "exponent-calculator"] },
  { name: "Fraction Calculator", slug: "fraction-calculator", category: "Math",
    description: "Add, subtract, multiply, and divide fractions with step-by-step output.",
    related: ["ratio-calculator", "lcm-calculator", "gcf-calculator"] },
  { name: "Standard Deviation Calculator", slug: "standard-deviation-calculator", category: "Math",
    description: "Compute population and sample standard deviation with variance.",
    related: ["mean-median-mode-calculator", "statistics-calculator", "z-score-calculator"] },
  { name: "Random Number Generator", slug: "random-number-generator", category: "Math",
    description: "Generate random numbers with custom range and quantity.",
    related: ["password-generator", "probability-calculator"] },
  { name: "Quadratic Formula Calculator", slug: "quadratic-formula-calculator", category: "Math",
    description: "Solve ax² + bx + c = 0 including complex roots.",
    related: ["scientific-calculator", "root-calculator", "slope-calculator"] },
  { name: "Pythagorean Theorem Calculator", slug: "pythagorean-theorem-calculator", category: "Math",
    description: "Solve any side of a right triangle using a² + b² = c².",
    related: ["right-triangle-calculator", "triangle-calculator", "area-calculator"] },
  // ... (add remaining math tools)

  // ---------- HEALTH ----------
  { name: "BMI Calculator", slug: "bmi-calculator", category: "Health",
    description: "Body Mass Index with category classification and healthy range.",
    related: ["bmr-calculator", "tdee-calculator", "ideal-weight-calculator", "calorie-calculator"] },
  { name: "Calorie Calculator", slug: "calorie-calculator", category: "Health",
    description: "Daily calorie needs based on age, sex, activity, and goals.",
    related: ["bmr-calculator", "tdee-calculator", "macro-calculator"] },
  { name: "BMR Calculator", slug: "bmr-calculator", category: "Health",
    description: "Basal Metabolic Rate using Mifflin-St Jeor or Harris-Benedict.",
    related: ["tdee-calculator", "calorie-calculator", "macro-calculator"] },
  { name: "Body Fat Calculator", slug: "body-fat-calculator", category: "Health",
    description: "Estimate body fat percentage from measurements or Navy method.",
    related: ["bmi-calculator", "lean-body-mass-calculator", "army-body-fat-calculator"] },
  { name: "Ideal Weight Calculator", slug: "ideal-weight-calculator", category: "Health",
    description: "Ideal body weight using Devine, Robinson, Miller, and Hamwi formulas.",
    related: ["bmi-calculator", "healthy-weight-calculator", "body-fat-calculator"] },
  { name: "Pace Calculator", slug: "pace-calculator", category: "Health",
    description: "Running pace, time, or distance — solve for any variable.",
    related: ["calories-burned-calculator", "target-heart-rate-calculator"] },
  // ... (add remaining health tools)

  // ---------- DATE & TIME ----------
  { name: "Age Calculator", slug: "age-calculator", category: "Date & Time",
    description: "Exact age in years, months, days, hours, and minutes.",
    related: ["date-calculator", "day-counter", "time-duration-calculator"] },
  { name: "Date Calculator", slug: "date-calculator", category: "Date & Time",
    description: "Add or subtract days, weeks, months, or years from a date.",
    related: ["age-calculator", "day-counter", "time-duration-calculator"] },
  { name: "Time Duration Calculator", slug: "time-duration-calculator", category: "Date & Time",
    description: "Duration between two times including overnight spans.",
    related: ["hours-calculator", "time-card-calculator", "date-calculator"] },
  { name: "Hours Calculator", slug: "hours-calculator", category: "Date & Time",
    description: "Hours between two times, with break deduction.",
    related: ["time-card-calculator", "time-duration-calculator"] },
  { name: "GPA Calculator", slug: "gpa-calculator", category: "Date & Time",
    description: "Weighted and unweighted GPA from course grades and credits.",
    related: ["grade-calculator"] },
  // ... (add remaining date/time tools)

  // ---------- CONVERSION ----------
  { name: "Length Converter", slug: "length-converter", category: "Conversion",
    description: "Convert between meters, feet, inches, miles, km, and more.",
    related: ["area-converter", "volume-converter", "weight-converter"] },
  { name: "Weight Converter", slug: "weight-converter", category: "Conversion",
    description: "Convert kg, lb, oz, g, stone, and tonnes.",
    related: ["mass-converter", "length-converter", "volume-converter"] },
  { name: "Temperature Converter", slug: "temperature-converter", category: "Conversion",
    description: "Convert Celsius, Fahrenheit, and Kelvin.",
    related: ["length-converter", "volume-converter"] },
  { name: "Roman Numeral Converter", slug: "roman-numeral-converter", category: "Conversion",
    description: "Convert between Arabic numbers and Roman numerals.",
    related: ["binary-calculator", "hex-calculator"] },
  // ... (add remaining conversion tools)

  // ---------- ENGINEERING ----------
  { name: "Concrete Calculator", slug: "concrete-calculator", category: "Engineering",
    description: "Estimate cubic yards/meters of concrete for slabs, footings, columns.",
    related: ["square-footage-calculator", "gravel-calculator", "tile-calculator"] },
  { name: "Ohm's Law Calculator", slug: "ohms-law-calculator", category: "Engineering",
    description: "Solve V = IR, P = VI for any two known values.",
    related: ["resistor-calculator", "voltage-drop-calculator", "electricity-calculator"] },
  { name: "Square Footage Calculator", slug: "square-footage-calculator", category: "Engineering",
    description: "Area of rooms, plots, or irregular shapes with cost estimation.",
    related: ["concrete-calculator", "tile-calculator", "roofing-calculator"] },
  { name: "IP Subnet Calculator", slug: "ip-subnet-calculator", category: "Engineering",
    description: "IPv4 subnet mask, network/broadcast address, host range.",
    related: ["bandwidth-calculator", "hex-converter", "binary-converter"] },
  // ... (add remaining engineering tools)

  // ---------- DEVELOPER TOOLS ----------
  { name: "Password Generator", slug: "password-generator", category: "Developer",
    description: "Cryptographically secure passwords with custom rules.",
    related: ["base64-encoder-decoder", "url-encoder-decoder", "hex-converter"] },
  { name: "Base64 Encoder/Decoder", slug: "base64-encoder-decoder", category: "Developer",
    description: "Encode or decode Base64 text and files in your browser.",
    related: ["url-encoder-decoder", "hex-converter", "binary-converter"] },
  { name: "URL Encoder/Decoder", slug: "url-encoder-decoder", category: "Developer",
    description: "Percent-encode or decode URLs and query strings.",
    related: ["base64-encoder-decoder", "hex-converter"] },
];

/* Helper: get tool by slug */
window.getToolBySlug = function (slug) {
  return window.TOOLS_DATA.find((t) => t.slug === slug) || null;
};

/* Helper: get tools by category */
window.getToolsByCategory = function (category) {
  return window.TOOLS_DATA.filter((t) => t.category === category);
};

/* Category metadata for landing pages */
window.CATEGORIES = [
  { name: "Financial", slug: "financial", icon: "💰", description: "Loans, interest, investments, and money management tools." },
  { name: "Math", slug: "math", icon: "📐", description: "Percentages, statistics, algebra, geometry, and number tools." },
  { name: "Health", slug: "health", icon: "❤️", description: "BMI, calories, body fat, macros, and fitness calculators." },
  { name: "Date & Time", slug: "date-time", icon: "📅", description: "Age, date differences, time zones, and duration tools." },
  { name: "Conversion", slug: "conversion", icon: "🔄", description: "Length, weight, temperature, area, and unit converters." },
  { name: "Engineering", slug: "engineering", icon: "⚙️", description: "Construction, electrical, and technical calculators." },
  { name: "Developer", slug: "developer", icon: "👨‍💻", description: "Encoders, generators, subnet, and code utilities." },
];
