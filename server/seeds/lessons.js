const lessons = [
  {
    title: 'Number Systems & Operations',
    subject: 'Mathematics',
    topic: 'Number Systems',
    order: 1,
    difficulty: 'Beginner',
    estimatedTime: 25,
    objectives: [
      'Understand different number systems (Natural, Whole, Integers, Rational, Irrational, Real)',
      'Perform operations on fractions and decimals',
      'Apply the laws of indices (exponents)',
      'Convert between number bases (base 2, base 8, base 10)'
    ],
    content: `# Number Systems & Operations

## Types of Numbers

Understanding number types is fundamental to all mathematics:

| Type | Definition | Examples |
|------|-----------|----------|
| **Natural (ℕ)** | Counting numbers | 1, 2, 3, 4, ... |
| **Whole (W)** | Natural + zero | 0, 1, 2, 3, ... |
| **Integers (ℤ)** | Whole + negatives | ..., -2, -1, 0, 1, 2, ... |
| **Rational (ℚ)** | Can be written as a/b | ½, 0.75, -3, 2.333... |
| **Irrational** | Cannot be written as a/b | √2, π, e |
| **Real (ℝ)** | All rational + irrational | All the above |

## Operations on Fractions

### Addition & Subtraction
Find a common denominator:
$$\\frac{2}{3} + \\frac{1}{4} = \\frac{8}{12} + \\frac{3}{12} = \\frac{11}{12}$$

### Multiplication
Multiply numerators and denominators:
$$\\frac{3}{5} × \\frac{2}{7} = \\frac{6}{35}$$

### Division
Flip and multiply:
$$\\frac{3}{4} ÷ \\frac{2}{5} = \\frac{3}{4} × \\frac{5}{2} = \\frac{15}{8}$$

## Laws of Indices

These rules make working with powers much easier:

| Law | Rule | Example |
|-----|------|---------|
| Multiplication | aⁿ × aᵐ = aⁿ⁺ᵐ | 2³ × 2⁴ = 2⁷ = 128 |
| Division | aⁿ ÷ aᵐ = aⁿ⁻ᵐ | 5⁶ ÷ 5² = 5⁴ = 625 |
| Power of power | (aⁿ)ᵐ = aⁿˣᵐ | (3²)³ = 3⁶ = 729 |
| Zero index | a⁰ = 1 | 7⁰ = 1 |
| Negative index | a⁻ⁿ = 1/aⁿ | 2⁻³ = 1/8 |
| Fractional index | a^(1/n) = ⁿ√a | 8^(1/3) = ∛8 = 2 |

### Example:
Simplify: (2³ × 4²) ÷ 2⁵

Solution: 4² = (2²)² = 2⁴
So: (2³ × 2⁴) ÷ 2⁵ = 2⁷ ÷ 2⁵ = 2² = **4**

## Number Base Conversions

### Decimal (Base 10) to Binary (Base 2)
Convert 13 to binary: Repeatedly divide by 2 and collect remainders.
13 ÷ 2 = 6 remainder **1**
6 ÷ 2 = 3 remainder **0**
3 ÷ 2 = 1 remainder **1**
1 ÷ 2 = 0 remainder **1**
Read remainders bottom-up: **1101₂**

### Binary to Decimal
1101₂ = 1×2³ + 1×2² + 0×2¹ + 1×2⁰ = 8 + 4 + 0 + 1 = **13**

## Key Takeaways
- Real numbers include both rational and irrational numbers
- Master the laws of indices — they appear in almost every WAEC/JAMB question
- For fractions: find LCD for ±, flip for ÷, straight across for ×
- Number base: divide repeatedly for base conversion, use place values to convert back`,
    codeExamples: [
      {
        title: 'Fraction Addition',
        code: '2/3 + 1/4 = 8/12 + 3/12 = 11/12',
        explanation: 'Find the LCD (12), convert each fraction, then add the numerators.'
      },
      {
        title: 'Index Law',
        code: '2³ × 2⁴ = 2^(3+4) = 2⁷ = 128',
        explanation: 'When multiplying with the same base, add the powers.'
      }
    ]
  },
  {
    title: 'Algebra — Expressions & Equations',
    subject: 'Mathematics',
    topic: 'Algebra',
    order: 2,
    difficulty: 'Beginner',
    estimatedTime: 30,
    objectives: [
      'Simplify algebraic expressions',
      'Solve linear equations in one variable',
      'Expand and factorize algebraic expressions',
      'Solve word problems using algebra'
    ],
    content: `# Algebra — Expressions & Equations

## Algebraic Expressions

An expression is a combination of variables, numbers, and operations:

- **3x + 5** → a linear expression
- **2x² - 4x + 1** → a quadratic expression
- **x/3 + 7** → includes a fraction

### Like Terms
Only combine terms with the same variables and powers:
- 3x + 5x = **8x** ✅
- 2x² + 3x → Cannot simplify further ❌

### Example: Simplify 4a + 3b - 2a + 7b
Group like terms: (4a - 2a) + (3b + 7b) = **2a + 10b**

## Solving Linear Equations

The goal: get the variable **alone** on one side.

### Example 1: Solve 3x + 7 = 22
Step 1: 3x = 22 - 7 = 15
Step 2: x = 15 ÷ 3 = **5** ✅

### Example 2: Solve 2(x - 3) = x + 4
Step 1: 2x - 6 = x + 4 (expand)
Step 2: 2x - x = 4 + 6 (collect terms)
Step 3: x = **10** ✅

## Expansion (Removing Brackets)

### Single bracket:
3(2x + 5) = 6x + 15

### Double bracket:
(x + 3)(x + 5) = x² + 5x + 3x + 15 = **x² + 8x + 15**

Use the **FOIL** method: First, Outer, Inner, Last

## Factorization

The reverse of expansion — putting back the brackets.

### Common Factor:
6x + 9 = **3(2x + 3)**

### Quadratic Factorization:
x² + 7x + 12 → Find two numbers that multiply to 12 and add to 7
Those are: 3 and 4
So: x² + 7x + 12 = **(x + 3)(x + 4)**

### Difference of Two Squares:
a² - b² = **(a + b)(a - b)**
Example: x² - 25 = (x + 5)(x - 5)

## Word Problems

**Example**: Amaka has three times as many oranges as Bola. Together they have 24 oranges. How many does each have?

Let Bola's oranges = x
Then Amaka's = 3x
Total: x + 3x = 24
4x = 24
x = 6

**Bola has 6 oranges, Amaka has 18 oranges** ✅

## Key Takeaways
- Only like terms can be combined
- Whatever you do to one side of an equation, do to the other
- Use FOIL for double bracket expansion
- For factorization, find factors that multiply AND add correctly
- Convert word problems to equations step by step`,
    codeExamples: []
  },
  {
    title: 'Quadratic Equations',
    subject: 'Mathematics',
    topic: 'Quadratics',
    order: 3,
    difficulty: 'Intermediate',
    estimatedTime: 30,
    objectives: [
      'Solve quadratic equations by factorization',
      'Use the quadratic formula',
      'Complete the square',
      'Identify the nature of roots using the discriminant'
    ],
    content: `# Quadratic Equations

## Standard Form
A quadratic equation has the form: **ax² + bx + c = 0** where a ≠ 0

## Method 1: Factorization

### Example: Solve x² - 5x + 6 = 0
Find two numbers that multiply to 6 and add to -5: **-2 and -3**
(x - 2)(x - 3) = 0
x = 2 or x = 3 ✅

### Example: Solve 2x² + 7x + 3 = 0
Product = 2 × 3 = 6. Sum = 7. Numbers: 6 and 1
2x² + 6x + x + 3 = 0
2x(x + 3) + 1(x + 3) = 0
(2x + 1)(x + 3) = 0
x = -½ or x = -3 ✅

## Method 2: Quadratic Formula

When factorization is hard, use:
$$x = \\frac{-b ± \\sqrt{b² - 4ac}}{2a}$$

### Example: Solve 2x² - 3x - 5 = 0
a = 2, b = -3, c = -5

b² - 4ac = 9 - 4(2)(-5) = 9 + 40 = 49
√49 = 7

x = (3 ± 7) / 4
x = (3 + 7)/4 = 10/4 = **2.5**
or x = (3 - 7)/4 = -4/4 = **-1**

## Method 3: Completing the Square

### Example: Solve x² + 6x + 2 = 0
Step 1: x² + 6x = -2
Step 2: Take half of 6, square it: (6/2)² = 9
Step 3: x² + 6x + 9 = -2 + 9
Step 4: (x + 3)² = 7
Step 5: x + 3 = ±√7
Step 6: x = -3 ± √7

x = -3 + √7 ≈ -0.354 or x = -3 - √7 ≈ -5.646

## The Discriminant (D = b² - 4ac)

The discriminant tells you the **nature of roots**:

| Discriminant | Nature of Roots |
|:-----------:|:----------------|
| D > 0 | Two distinct real roots |
| D = 0 | Two equal real roots (repeated) |
| D < 0 | No real roots (complex roots) |

### Example: Find the nature of roots of 3x² - 2x + 5 = 0
D = (-2)² - 4(3)(5) = 4 - 60 = -56
D < 0 → **No real roots** ❌

## Sum & Product of Roots

For ax² + bx + c = 0 with roots α and β:
- **Sum**: α + β = -b/a
- **Product**: αβ = c/a

## Key Takeaways
- Try factorization first — it's the fastest method
- Quadratic formula works for ALL quadratics
- The discriminant reveals the nature of roots before solving
- Completing the square is also used to find the vertex of a parabola`,
    codeExamples: []
  },
  {
    title: 'Sets & Venn Diagrams',
    subject: 'Mathematics',
    topic: 'Sets',
    order: 4,
    difficulty: 'Beginner',
    estimatedTime: 25,
    objectives: [
      'Understand set notation and types of sets',
      'Perform union, intersection, and complement operations',
      'Solve problems using Venn diagrams',
      'Apply set theory to word problems'
    ],
    content: `# Sets & Venn Diagrams

## What is a Set?
A set is a well-defined collection of distinct objects, called **elements** or **members**.

Examples:
- A = {1, 2, 3, 4, 5} — set of first 5 natural numbers
- B = {a, e, i, o, u} — set of vowels
- C = {x : x is a prime number less than 20}

## Set Notation

| Symbol | Meaning | Example |
|--------|---------|---------|
| ∈ | "is a member of" | 3 ∈ A |
| ∉ | "is not a member of" | 6 ∉ A |
| ⊂ | "is a subset of" | {1,2} ⊂ A |
| ∪ | Union (OR) | A ∪ B |
| ∩ | Intersection (AND) | A ∩ B |
| A' | Complement (NOT in A) | A' |
| n(A) | Number of elements in A | n(A) = 5 |
| ∅ or {} | Empty set | |
| U | Universal set | |

## Set Operations

Given U = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}, A = {1, 2, 3, 4, 5}, B = {3, 4, 5, 6, 7}

### Union (A ∪ B) — elements in A OR B (or both):
A ∪ B = {1, 2, 3, 4, 5, 6, 7}

### Intersection (A ∩ B) — elements in A AND B:
A ∩ B = {3, 4, 5}

### Complement (A') — elements NOT in A:
A' = {6, 7, 8, 9, 10}

## Venn Diagram Word Problems

### The Magic Formula for Two Sets:
n(A ∪ B) = n(A) + n(B) - n(A ∩ B)

### Example:
In a class of 40 students, 25 offer Mathematics, 20 offer Physics, and 10 offer both.

Let M = Maths, P = Physics
n(M ∪ P) = 25 + 20 - 10 = **35 students** offer at least one subject
Students offering neither = 40 - 35 = **5 students**

### Three-Set Formula:
n(A ∪ B ∪ C) = n(A) + n(B) + n(C) - n(A∩B) - n(A∩C) - n(B∩C) + n(A∩B∩C)

## Key Takeaways
- Sets contain unique elements — no duplicates
- Union (∪) combines, Intersection (∩) finds common elements
- The complement is everything in U that's NOT in the set
- Always draw Venn diagrams for word problems — start from the middle (intersection)
- This is a very common WAEC/JAMB topic — master the formula!`,
    codeExamples: []
  },
  {
    title: 'Trigonometry',
    subject: 'Mathematics',
    topic: 'Trigonometry',
    order: 5,
    difficulty: 'Intermediate',
    estimatedTime: 35,
    objectives: [
      'Define and use sine, cosine, and tangent ratios',
      'Solve right-angled triangle problems using SOHCAHTOA',
      'Apply the sine and cosine rules to any triangle',
      'Use trigonometric identities'
    ],
    content: `# Trigonometry

## SOHCAHTOA — The Foundation

For a right-angled triangle with angle θ:

| Ratio | Formula | Mnemonic |
|-------|---------|----------|
| sin θ | Opposite / Hypotenuse | **SOH** |
| cos θ | Adjacent / Hypotenuse | **CAH** |
| tan θ | Opposite / Adjacent | **TOA** |

### Example:
A ladder 10m long leans against a wall making a 60° angle with the ground. How high up the wall does it reach?

sin 60° = height / 10
height = 10 × sin 60° = 10 × 0.866 = **8.66m**

## Standard Angles

| Angle | sin | cos | tan |
|:-----:|:---:|:---:|:---:|
| 0° | 0 | 1 | 0 |
| 30° | ½ | √3/2 | 1/√3 |
| 45° | √2/2 | √2/2 | 1 |
| 60° | √3/2 | ½ | √3 |
| 90° | 1 | 0 | undefined |

## The Sine Rule (Any Triangle)

$$\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C}$$

Use when you know: **a side and its opposite angle + one more measurement**

### Example:
In triangle ABC, A = 40°, B = 60°, a = 8cm. Find b.

b/sin 60° = 8/sin 40°
b = 8 × sin 60° / sin 40° = 8 × 0.866 / 0.643 = **10.78cm**

## The Cosine Rule (Any Triangle)

$$a² = b² + c² - 2bc \\cos A$$

Use when you know: **two sides and the included angle** OR **all three sides**

### Example:
In triangle PQR, p = 7cm, q = 5cm, angle R = 120°. Find r.

r² = 7² + 5² - 2(7)(5)cos 120°
r² = 49 + 25 - 70(-0.5)
r² = 49 + 25 + 35 = 109
r = √109 = **10.44cm**

## Trigonometric Identities

- sin²θ + cos²θ = 1
- tan θ = sin θ / cos θ
- sin(90° - θ) = cos θ
- cos(90° - θ) = sin θ

## Key Takeaways
- SOHCAHTOA works only for right-angled triangles
- Sine rule: when you have an angle and its opposite side
- Cosine rule: when you have two sides and the included angle, or all three sides
- Memorize the standard angle values — they come up in EVERY exam!`,
    codeExamples: []
  },
  {
    title: 'Statistics & Probability',
    subject: 'Mathematics',
    topic: 'Statistics',
    order: 6,
    difficulty: 'Intermediate',
    estimatedTime: 30,
    objectives: [
      'Calculate mean, median, and mode for grouped and ungrouped data',
      'Calculate standard deviation and variance',
      'Understand basic probability concepts',
      'Solve combined probability problems'
    ],
    content: `# Statistics & Probability

## Measures of Central Tendency

### Mean (Average)
**Ungrouped**: Mean = Sum of values / Number of values

Example: Scores: 65, 78, 82, 55, 91
Mean = (65 + 78 + 82 + 55 + 91) / 5 = 371/5 = **74.2**

**Grouped Data**: Mean = Σfx / Σf
Where f = frequency, x = class midpoint

### Median
The middle value when data is arranged in order.
- Odd count: middle value
- Even count: average of two middle values

Example: 3, 5, 7, 9, 11 → Median = **7**
Example: 3, 5, 7, 9 → Median = (5 + 7)/2 = **6**

### Mode
The most frequent value.
Example: 2, 3, 3, 4, 5, 5, 5, 6 → Mode = **5**

## Measures of Dispersion

### Range
Range = Highest value - Lowest value

### Variance
$$\\text{Variance} = \\frac{\\sum(x - \\bar{x})²}{n}$$

### Standard Deviation
$$\\text{SD} = \\sqrt{\\text{Variance}}$$

A small SD means data is clustered near the mean. A large SD means data is spread out.

## Probability

### Basic Formula:
$$P(A) = \\frac{\\text{Number of favorable outcomes}}{\\text{Total number of outcomes}}$$

### Example: A bag contains 5 red, 3 blue, 2 green balls. Find:
- P(red) = 5/10 = **1/2**
- P(blue) = 3/10
- P(not green) = 8/10 = **4/5**

### Combined Events

**Independent events (AND)**: P(A and B) = P(A) × P(B)

**Mutually exclusive (OR)**: P(A or B) = P(A) + P(B)

**Not mutually exclusive**: P(A or B) = P(A) + P(B) - P(A and B)

### Example: Rolling a fair die
P(even) = 3/6 = 1/2
P(greater than 4) = 2/6 = 1/3
P(even AND greater than 4) = P(6) = 1/6
P(even OR greater than 4) = 1/2 + 1/3 - 1/6 = **2/3**

## Key Takeaways
- Mean is affected by outliers; median is more robust
- Standard deviation measures how spread out data is
- Probability is always between 0 and 1
- AND means multiply; OR means add (minus overlap if not exclusive)`,
    codeExamples: []
  },
  {
    title: 'Coordinate Geometry',
    subject: 'Mathematics',
    topic: 'Coordinate Geometry',
    order: 7,
    difficulty: 'Intermediate',
    estimatedTime: 25,
    objectives: [
      'Find the distance between two points',
      'Calculate the midpoint of a line segment',
      'Determine the gradient (slope) of a line',
      'Write the equation of a straight line'
    ],
    content: `# Coordinate Geometry

## The Distance Formula

The distance between points (x₁, y₁) and (x₂, y₂):

$$d = \\sqrt{(x₂ - x₁)² + (y₂ - y₁)²}$$

### Example:
Find the distance between A(2, 3) and B(6, 7):
d = √[(6-2)² + (7-3)²] = √[16 + 16] = √32 = **4√2 ≈ 5.66 units**

## The Midpoint Formula

The midpoint M of a line from (x₁, y₁) to (x₂, y₂):

$$M = \\left(\\frac{x₁ + x₂}{2}, \\frac{y₁ + y₂}{2}\\right)$$

### Example:
Find the midpoint of P(1, 4) and Q(5, 8):
M = ((1+5)/2, (4+8)/2) = **(3, 6)**

## Gradient (Slope)

The gradient measures how steep a line is:

$$m = \\frac{y₂ - y₁}{x₂ - x₁}$$

### Types of Gradients:
- **Positive gradient**: line goes up from left to right (↗)
- **Negative gradient**: line goes down from left to right (↘)
- **Zero gradient**: horizontal line (→)
- **Undefined gradient**: vertical line (↑)

### Example:
Find the gradient of the line through (2, 1) and (6, 9):
m = (9 - 1)/(6 - 2) = 8/4 = **2**

## Equation of a Straight Line

### Slope-Intercept Form: y = mx + c
Where m = gradient, c = y-intercept

### Point-Slope Form: y - y₁ = m(x - x₁)

### Example:
Find the equation of a line with gradient 3 passing through (2, 5):
y - 5 = 3(x - 2)
y - 5 = 3x - 6
y = 3x - 1 → **y = 3x - 1**

## Parallel and Perpendicular Lines

- **Parallel lines**: Same gradient → m₁ = m₂
- **Perpendicular lines**: Gradients multiply to -1 → m₁ × m₂ = -1

### Example:
Line L has gradient 2. Find the gradient of a line perpendicular to L.
m₁ × m₂ = -1
2 × m₂ = -1
m₂ = **-1/2**

## Key Takeaways
- Distance formula comes from Pythagoras theorem
- Midpoint = average of coordinates
- Gradient = rise/run = (y₂ - y₁)/(x₂ - x₁)
- Parallel lines: same gradient; Perpendicular lines: m₁ × m₂ = -1`,
    codeExamples: []
  },
  {
    title: 'Geometry — Circles & Angles',
    subject: 'Mathematics',
    topic: 'Geometry',
    order: 8,
    difficulty: 'Intermediate',
    estimatedTime: 30,
    objectives: [
      'Calculate the area and circumference of circles',
      'Understand circle theorems',
      'Work with angles on parallel lines',
      'Calculate areas and volumes of common shapes'
    ],
    content: `# Geometry — Circles & Angles

## Circle Properties

| Property | Formula |
|----------|---------|
| Circumference | C = 2πr = πd |
| Area | A = πr² |
| Arc length | l = (θ/360°) × 2πr |
| Sector area | A = (θ/360°) × πr² |

### Example: A circle has radius 7cm. Find:
- Circumference = 2 × π × 7 = **44cm** (using π = 22/7)
- Area = π × 7² = 22/7 × 49 = **154cm²**

### Arc and Sector
A sector with angle 60° and radius 14cm:
- Arc length = (60/360) × 2 × 22/7 × 14 = **14.67cm**
- Sector area = (60/360) × 22/7 × 14² = **102.67cm²**

## Circle Theorems

1. **Angle at centre = 2 × angle at circumference** (from the same arc)
2. **Angle in a semicircle = 90°**
3. **Angles in the same segment are equal**
4. **Opposite angles of a cyclic quadrilateral = 180°**
5. **Tangent is perpendicular to radius** at the point of contact
6. **Two tangents from an external point are equal in length**

## Angles on Parallel Lines

When a transversal crosses parallel lines:

| Type | Position | Relationship |
|------|----------|-------------|
| **Alternate angles** | Z-shape | Equal |
| **Corresponding angles** | F-shape | Equal |
| **Co-interior angles** | C/U-shape | Sum = 180° |
| **Vertically opposite** | X-shape | Equal |

## Areas of Shapes

| Shape | Area Formula |
|-------|-------------|
| Triangle | ½ × base × height |
| Rectangle | length × width |
| Parallelogram | base × height |
| Trapezium | ½(a + b) × h |
| Circle | πr² |

## Volumes

| Shape | Volume |
|-------|--------|
| Cube | a³ |
| Cuboid | l × w × h |
| Cylinder | πr²h |
| Cone | ⅓πr²h |
| Sphere | ⁴⁄₃πr³ |

## Key Takeaways
- Always check if angle is at the centre or circumference
- Circle theorems are essential for WAEC — learn all 6
- For parallel lines: Alternate (Z) = Equal, Co-interior (C) = 180°
- Don't confuse perimeter (around) with area (inside)`,
    codeExamples: []
  },
  {
    title: 'Sequences & Series',
    subject: 'Mathematics',
    topic: 'Sequences',
    order: 9,
    difficulty: 'Intermediate',
    estimatedTime: 25,
    objectives: [
      'Identify arithmetic and geometric sequences',
      'Find the nth term and sum of arithmetic progressions (AP)',
      'Find the nth term and sum of geometric progressions (GP)',
      'Apply sequences to solve real-world problems'
    ],
    content: `# Sequences & Series

## Arithmetic Progression (AP)

A sequence where the difference between consecutive terms is **constant**.

**Common difference**: d = a₂ - a₁

| Formula | Meaning |
|---------|---------|
| aₙ = a + (n-1)d | nth term |
| Sₙ = n/2 [2a + (n-1)d] | Sum of first n terms |
| Sₙ = n/2 (a + l) | Sum using first and last term |

Where: a = first term, d = common difference, n = number of terms, l = last term

### Example: Find the 20th term of 3, 7, 11, 15, ...
a = 3, d = 4
a₂₀ = 3 + (20-1)(4) = 3 + 76 = **79**

### Example: Find the sum of the first 15 terms
S₁₅ = 15/2 [2(3) + (15-1)(4)]
S₁₅ = 15/2 [6 + 56]
S₁₅ = 15/2 × 62 = **465**

## Geometric Progression (GP)

A sequence where the ratio between consecutive terms is **constant**.

**Common ratio**: r = a₂/a₁

| Formula | Meaning |
|---------|---------|
| aₙ = arⁿ⁻¹ | nth term |
| Sₙ = a(rⁿ - 1)/(r - 1) | Sum of n terms (r ≠ 1) |
| S∞ = a/(1 - r) | Sum to infinity (|r| < 1) |

### Example: Find the 6th term of 2, 6, 18, 54, ...
a = 2, r = 3
a₆ = 2 × 3⁵ = 2 × 243 = **486**

### Example: Sum to infinity of 8, 4, 2, 1, ...
a = 8, r = 1/2
S∞ = 8/(1 - 1/2) = 8/(1/2) = **16**

## Identifying AP vs GP

| Feature | AP | GP |
|---------|----|----|
| Pattern | Add/subtract same value | Multiply/divide same value |
| Test | a₂ - a₁ = a₃ - a₂ | a₂/a₁ = a₃/a₂ |
| Example | 5, 8, 11, 14 (d=3) | 3, 6, 12, 24 (r=2) |

## Application Problem
Chidi saves ₦1,000 in January and increases his savings by ₦500 each month. How much has he saved after 12 months?

This is an AP: a = 1000, d = 500, n = 12
S₁₂ = 12/2 [2(1000) + (11)(500)]
S₁₂ = 6 × [2000 + 5500] = 6 × 7500 = **₦45,000**

## Key Takeaways
- AP: constant difference (add/subtract same value)
- GP: constant ratio (multiply/divide same value)
- AP formulas use d (difference); GP formulas use r (ratio)
- Sum to infinity only exists for GP when |r| < 1`,
    codeExamples: []
  },
  {
    title: 'Logarithms & Surds',
    subject: 'Mathematics',
    topic: 'Logarithms',
    order: 10,
    difficulty: 'Advanced',
    estimatedTime: 30,
    objectives: [
      'Understand logarithmic notation and laws',
      'Simplify and solve equations involving logarithms',
      'Simplify surd expressions',
      'Rationalize the denominator of surd fractions'
    ],
    content: `# Logarithms & Surds

## What is a Logarithm?

A logarithm answers: "To what power must we raise the base to get this number?"

If **aˣ = N**, then **log_a(N) = x**

Examples:
- 10² = 100 → log₁₀(100) = 2
- 2³ = 8 → log₂(8) = 3
- 5⁰ = 1 → log₅(1) = 0

## Laws of Logarithms

| Law | Formula |
|-----|---------|
| Product | log(AB) = log A + log B |
| Quotient | log(A/B) = log A - log B |
| Power | log(Aⁿ) = n log A |
| Change of base | log_a(b) = log b / log a |
| Identity | log_a(a) = 1 |
| Zero | log_a(1) = 0 |

### Example: Simplify log₁₀(25) + log₁₀(4)
= log₁₀(25 × 4) = log₁₀(100) = **2**

### Example: Solve log₂(x) = 5
x = 2⁵ = **32**

### Example: Evaluate log₃(81)
81 = 3⁴ → log₃(81) = **4**

## Surds

A surd is an irrational root that cannot be simplified to a whole number: √2, √3, ³√5

### Simplifying Surds
√12 = √(4 × 3) = **2√3**
√75 = √(25 × 3) = **5√3**
√48 = √(16 × 3) = **4√3**

### Operations with Surds

**Addition/Subtraction** (like terms only):
3√2 + 5√2 = **8√2** ✅
2√3 + √5 → Cannot simplify ❌

**Multiplication**:
√3 × √5 = **√15**
2√3 × 4√3 = 8 × 3 = **24**

## Rationalizing the Denominator

Remove surds from the denominator:

### Simple case:
$$\\frac{5}{\\sqrt{3}} = \\frac{5}{\\sqrt{3}} × \\frac{\\sqrt{3}}{\\sqrt{3}} = \\frac{5\\sqrt{3}}{3}$$

### Conjugate case:
$$\\frac{3}{2 + \\sqrt{5}} = \\frac{3(2 - \\sqrt{5})}{(2 + \\sqrt{5})(2 - \\sqrt{5})} = \\frac{3(2 - \\sqrt{5})}{4 - 5} = \\frac{3(2 - \\sqrt{5})}{-1} = -3(2 - \\sqrt{5})$$

Multiply by the **conjugate**: change the sign between terms.

## Key Takeaways
- log is the inverse of exponentiation
- Know the three main log laws: product, quotient, power
- Simplify surds by factoring out perfect squares
- Rationalize denominators by multiplying by conjugate
- These topics frequently appear together in WAEC/JAMB`,
    codeExamples: []
  }
];

module.exports = lessons;
