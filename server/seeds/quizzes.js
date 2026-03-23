// Quiz seed data - mapped by lesson order to be linked after lessons are seeded
const quizzesByLessonOrder = [
  {
    lessonOrder: 1,
    title: 'Number Systems & Operations Quiz',
    passingScore: 60,
    questions: [
      {
        question: 'Which of these is an irrational number?',
        options: ['3/4', '0.5', '√2', '7'],
        correctAnswer: 2,
        explanation: '√2 cannot be expressed as a fraction a/b, making it irrational. 3/4, 0.5, and 7 are all rational.',
        topic: 'Number Systems'
      },
      {
        question: 'Simplify: 2³ × 2⁴',
        options: ['2⁷', '2¹²', '4⁷', '4¹²'],
        correctAnswer: 0,
        explanation: 'When multiplying with the same base, add the powers: 2³ × 2⁴ = 2^(3+4) = 2⁷ = 128.',
        topic: 'Number Systems'
      },
      {
        question: 'What is 13 in binary (base 2)?',
        options: ['1011', '1101', '1110', '1010'],
        correctAnswer: 1,
        explanation: '13 ÷ 2: remainders read bottom-up give 1101₂. Verify: 1×8 + 1×4 + 0×2 + 1×1 = 13.',
        topic: 'Number Systems'
      },
      {
        question: 'What is the value of 5⁰?',
        options: ['0', '5', '1', 'undefined'],
        correctAnswer: 2,
        explanation: 'Any number raised to the power of 0 equals 1 (except 0⁰ which is debated). So 5⁰ = 1.',
        topic: 'Number Systems'
      },
      {
        question: 'Simplify: 2/3 + 1/4',
        options: ['3/7', '11/12', '3/12', '1/2'],
        correctAnswer: 1,
        explanation: 'LCD = 12. So 2/3 = 8/12 and 1/4 = 3/12. Therefore 8/12 + 3/12 = 11/12.',
        topic: 'Number Systems'
      }
    ]
  },
  {
    lessonOrder: 2,
    title: 'Algebra — Expressions & Equations Quiz',
    passingScore: 60,
    questions: [
      {
        question: 'Simplify: 4a + 3b - 2a + 7b',
        options: ['2a + 10b', '6a + 10b', '2a + 4b', '6a + 4b'],
        correctAnswer: 0,
        explanation: 'Group like terms: (4a - 2a) + (3b + 7b) = 2a + 10b.',
        topic: 'Algebra'
      },
      {
        question: 'Solve: 3x + 7 = 22',
        options: ['x = 3', 'x = 5', 'x = 7', 'x = 10'],
        correctAnswer: 1,
        explanation: '3x = 22 - 7 = 15. Therefore x = 15/3 = 5.',
        topic: 'Algebra'
      },
      {
        question: 'Expand: (x + 3)(x + 5)',
        options: ['x² + 8x + 15', 'x² + 15x + 8', 'x² + 2x + 15', 'x² + 8x + 8'],
        correctAnswer: 0,
        explanation: 'Using FOIL: x² + 5x + 3x + 15 = x² + 8x + 15.',
        topic: 'Algebra'
      },
      {
        question: 'Factorize: x² - 25',
        options: ['(x - 5)²', '(x + 5)(x - 5)', '(x - 25)(x + 1)', 'Cannot be factorized'],
        correctAnswer: 1,
        explanation: 'This is a difference of two squares: a² - b² = (a+b)(a-b). So x² - 25 = (x+5)(x-5).',
        topic: 'Algebra'
      },
      {
        question: 'If 2(x - 3) = x + 4, what is x?',
        options: ['5', '7', '10', '2'],
        correctAnswer: 2,
        explanation: '2x - 6 = x + 4. Then 2x - x = 4 + 6. So x = 10.',
        topic: 'Algebra'
      }
    ]
  },
  {
    lessonOrder: 3,
    title: 'Quadratic Equations Quiz',
    passingScore: 60,
    questions: [
      {
        question: 'Solve: x² - 5x + 6 = 0',
        options: ['x = -2 or x = -3', 'x = 2 or x = 3', 'x = 1 or x = 6', 'x = -1 or x = -6'],
        correctAnswer: 1,
        explanation: 'Factors of 6 that add to -5: -2 and -3. So (x-2)(x-3) = 0, giving x = 2 or x = 3.',
        topic: 'Quadratics'
      },
      {
        question: 'What is the quadratic formula?',
        options: ['x = -b ± √(b²-4ac) / 2a', 'x = b ± √(b²-4ac) / 2a', 'x = -b ± √(b²+4ac) / 2a', 'x = -b ± √(b-4ac) / a'],
        correctAnswer: 0,
        explanation: 'The quadratic formula is x = [-b ± √(b² - 4ac)] / 2a for the equation ax² + bx + c = 0.',
        topic: 'Quadratics'
      },
      {
        question: 'If the discriminant b² - 4ac < 0, the equation has:',
        options: ['Two real roots', 'One repeated root', 'No real roots', 'Infinite roots'],
        correctAnswer: 2,
        explanation: 'When D < 0, the square root of a negative number is not real, so there are no real roots.',
        topic: 'Quadratics'
      },
      {
        question: 'For ax² + bx + c = 0, the sum of roots equals:',
        options: ['b/a', '-b/a', 'c/a', '-c/a'],
        correctAnswer: 1,
        explanation: 'For roots α and β: α + β = -b/a (sum of roots formula).',
        topic: 'Quadratics'
      },
      {
        question: 'Complete the square of x² + 6x + 2 = 0:',
        options: ['(x + 3)² = 7', '(x + 3)² = 11', '(x + 6)² = 34', '(x + 2)² = 2'],
        correctAnswer: 0,
        explanation: 'x² + 6x = -2. Half of 6 = 3, square it = 9. Add to both sides: (x+3)² = -2 + 9 = 7.',
        topic: 'Quadratics'
      }
    ]
  },
  {
    lessonOrder: 4,
    title: 'Sets & Venn Diagrams Quiz',
    passingScore: 60,
    questions: [
      {
        question: 'If A = {1,2,3,4,5} and B = {3,4,5,6,7}, what is A ∩ B?',
        options: ['{1,2,6,7}', '{3,4,5}', '{1,2,3,4,5,6,7}', '{1,2}'],
        correctAnswer: 1,
        explanation: 'A ∩ B (intersection) contains elements common to both sets: {3, 4, 5}.',
        topic: 'Sets'
      },
      {
        question: 'In a class of 40 students, 25 offer Maths and 20 offer Physics. If 10 offer both, how many offer at least one?',
        options: ['45', '35', '30', '40'],
        correctAnswer: 1,
        explanation: 'n(M ∪ P) = n(M) + n(P) - n(M ∩ P) = 25 + 20 - 10 = 35.',
        topic: 'Sets'
      },
      {
        question: 'What does A\' (A complement) mean?',
        options: ['Elements in A', 'Elements in both A and U', 'Elements in U but not in A', 'The empty set'],
        correctAnswer: 2,
        explanation: 'A\' (complement of A) is the set of all elements in the universal set U that are NOT in A.',
        topic: 'Sets'
      },
      {
        question: 'What does the symbol ∈ mean?',
        options: ['Is a subset of', 'Is equal to', 'Is a member of', 'Is not in'],
        correctAnswer: 2,
        explanation: '∈ means "is a member of" or "belongs to". For example, 3 ∈ {1, 2, 3}.',
        topic: 'Sets'
      },
      {
        question: 'Which is the empty set?',
        options: ['{∅}', '{0}', '∅', 'None of the above'],
        correctAnswer: 2,
        explanation: '∅ or {} represents the empty set. {∅} is a set containing the empty set, and {0} contains zero.',
        topic: 'Sets'
      }
    ]
  },
  {
    lessonOrder: 5,
    title: 'Trigonometry Quiz',
    passingScore: 60,
    questions: [
      {
        question: 'In SOHCAHTOA, what does "CAH" stand for?',
        options: ['Cosine = Adjacent / Hypotenuse', 'Cosine = Adjacent × Hypotenuse', 'Cos = Area / Height', 'Cos = Angle / Height'],
        correctAnswer: 0,
        explanation: 'CAH means Cosine = Adjacent / Hypotenuse. It\'s the ratio of the adjacent side to the hypotenuse.',
        topic: 'Trigonometry'
      },
      {
        question: 'What is sin 30°?',
        options: ['1', '√3/2', '1/2', '√2/2'],
        correctAnswer: 2,
        explanation: 'sin 30° = 1/2. This is one of the standard angle values you should memorize.',
        topic: 'Trigonometry'
      },
      {
        question: 'When do you use the Sine Rule?',
        options: ['When you know all three sides', 'When you have a right angle', 'When you know a side and its opposite angle', 'Only for equilateral triangles'],
        correctAnswer: 2,
        explanation: 'The Sine Rule is used when you know a side and its opposite angle, plus one more measurement.',
        topic: 'Trigonometry'
      },
      {
        question: 'What is the Cosine Rule formula?',
        options: ['a = b + c - 2bc cos A', 'a² = b² + c² - 2bc cos A', 'a² = b² + c² + 2bc cos A', 'a = b² + c² - bc cos A'],
        correctAnswer: 1,
        explanation: 'The Cosine Rule: a² = b² + c² - 2bc cos A. Used for SAS or SSS triangle problems.',
        topic: 'Trigonometry'
      },
      {
        question: 'sin²θ + cos²θ = ?',
        options: ['0', '1', '2', 'tan²θ'],
        correctAnswer: 1,
        explanation: 'This is the Pythagorean identity: sin²θ + cos²θ = 1 for all angles θ.',
        topic: 'Trigonometry'
      }
    ]
  },
  {
    lessonOrder: 6,
    title: 'Statistics & Probability Quiz',
    passingScore: 60,
    questions: [
      {
        question: 'What is the mean of 65, 78, 82, 55, 91?',
        options: ['72.0', '74.2', '78.0', '82.0'],
        correctAnswer: 1,
        explanation: 'Mean = (65 + 78 + 82 + 55 + 91) / 5 = 371/5 = 74.2.',
        topic: 'Statistics'
      },
      {
        question: 'What is the median of 3, 5, 7, 9, 11?',
        options: ['5', '7', '9', '35'],
        correctAnswer: 1,
        explanation: 'The median is the middle value. In the ordered set {3, 5, 7, 9, 11}, the middle value is 7.',
        topic: 'Statistics'
      },
      {
        question: 'A bag has 5 red, 3 blue, 2 green balls. What is P(red)?',
        options: ['5/8', '1/2', '5/3', '3/10'],
        correctAnswer: 1,
        explanation: 'P(red) = favorable/total = 5/10 = 1/2. Total balls = 5 + 3 + 2 = 10.',
        topic: 'Statistics'
      },
      {
        question: 'For independent events A and B, P(A and B) = ?',
        options: ['P(A) + P(B)', 'P(A) × P(B)', 'P(A) - P(B)', 'P(A) / P(B)'],
        correctAnswer: 1,
        explanation: 'For independent events, P(A AND B) = P(A) × P(B). AND means multiply.',
        topic: 'Statistics'
      },
      {
        question: 'The mode of 2, 3, 3, 4, 5, 5, 5, 6 is:',
        options: ['3', '4', '5', '6'],
        correctAnswer: 2,
        explanation: 'The mode is the most frequent value. 5 appears 3 times — more than any other value.',
        topic: 'Statistics'
      }
    ]
  },
  {
    lessonOrder: 7,
    title: 'Coordinate Geometry Quiz',
    passingScore: 60,
    questions: [
      {
        question: 'What is the distance between (2, 3) and (6, 7)?',
        options: ['4', '4√2', '8', '√8'],
        correctAnswer: 1,
        explanation: 'd = √[(6-2)² + (7-3)²] = √[16+16] = √32 = 4√2.',
        topic: 'Coordinate Geometry'
      },
      {
        question: 'What is the midpoint of (1, 4) and (5, 8)?',
        options: ['(3, 6)', '(4, 12)', '(2, 4)', '(6, 12)'],
        correctAnswer: 0,
        explanation: 'Midpoint = ((1+5)/2, (4+8)/2) = (3, 6).',
        topic: 'Coordinate Geometry'
      },
      {
        question: 'What is the gradient of the line through (2, 1) and (6, 9)?',
        options: ['1', '2', '4', '1/2'],
        correctAnswer: 1,
        explanation: 'Gradient m = (9-1)/(6-2) = 8/4 = 2.',
        topic: 'Coordinate Geometry'
      },
      {
        question: 'If line L has gradient 2, the gradient of a line perpendicular to L is:',
        options: ['2', '-2', '1/2', '-1/2'],
        correctAnswer: 3,
        explanation: 'Perpendicular gradients multiply to -1. So m₂ = -1/2 because 2 × (-1/2) = -1.',
        topic: 'Coordinate Geometry'
      },
      {
        question: 'The equation y = 3x - 1 has gradient:',
        options: ['-1', '1', '3', '-3'],
        correctAnswer: 2,
        explanation: 'In y = mx + c, the coefficient of x is the gradient. Here m = 3.',
        topic: 'Coordinate Geometry'
      }
    ]
  },
  {
    lessonOrder: 8,
    title: 'Geometry — Circles & Angles Quiz',
    passingScore: 60,
    questions: [
      {
        question: 'What is the area of a circle with radius 7cm? (use π = 22/7)',
        options: ['44cm²', '154cm²', '49cm²', '616cm²'],
        correctAnswer: 1,
        explanation: 'Area = πr² = (22/7) × 7² = (22/7) × 49 = 154cm².',
        topic: 'Geometry'
      },
      {
        question: 'An angle in a semicircle is always:',
        options: ['45°', '60°', '90°', '180°'],
        correctAnswer: 2,
        explanation: 'The angle in a semicircle theorem states that any angle at the circumference subtended by a diameter is 90°.',
        topic: 'Geometry'
      },
      {
        question: 'Alternate angles on parallel lines are:',
        options: ['Supplementary', 'Complementary', 'Equal', 'Right angles'],
        correctAnswer: 2,
        explanation: 'Alternate angles (Z-angles) formed by a transversal cutting parallel lines are equal.',
        topic: 'Geometry'
      },
      {
        question: 'What is the volume of a cylinder with radius 3cm and height 10cm?',
        options: ['90π cm³', '30π cm³', '60π cm³', '9π cm³'],
        correctAnswer: 0,
        explanation: 'Volume = πr²h = π × 3² × 10 = 90π cm³.',
        topic: 'Geometry'
      },
      {
        question: 'The area of a trapezium with parallel sides 6cm, 10cm and height 4cm is:',
        options: ['40cm²', '24cm²', '32cm²', '64cm²'],
        correctAnswer: 2,
        explanation: 'Area = ½(a+b)×h = ½(6+10)×4 = ½ × 16 × 4 = 32cm².',
        topic: 'Geometry'
      }
    ]
  },
  {
    lessonOrder: 9,
    title: 'Sequences & Series Quiz',
    passingScore: 60,
    questions: [
      {
        question: 'The 20th term of the AP 3, 7, 11, 15, ... is:',
        options: ['75', '79', '83', '77'],
        correctAnswer: 1,
        explanation: 'a = 3, d = 4. a₂₀ = 3 + (20-1) × 4 = 3 + 76 = 79.',
        topic: 'Sequences'
      },
      {
        question: 'What is the common ratio of the GP: 2, 6, 18, 54?',
        options: ['2', '3', '4', '6'],
        correctAnswer: 1,
        explanation: 'Common ratio r = a₂/a₁ = 6/2 = 3. Verify: 6/2 = 18/6 = 54/18 = 3.',
        topic: 'Sequences'
      },
      {
        question: 'The sum to infinity of 8, 4, 2, 1, ... is:',
        options: ['15', '16', '32', 'Infinity'],
        correctAnswer: 1,
        explanation: 'S∞ = a/(1-r) = 8/(1-1/2) = 8/(1/2) = 16. This works because |r| = 1/2 < 1.',
        topic: 'Sequences'
      },
      {
        question: 'Which is an Arithmetic Progression?',
        options: ['1, 2, 4, 8', '3, 6, 9, 12', '1, 1, 2, 3, 5', '2, 4, 16, 256'],
        correctAnswer: 1,
        explanation: '3, 6, 9, 12 has a constant difference of 3 between each term, making it an AP.',
        topic: 'Sequences'
      },
      {
        question: 'The nth term formula for an AP is:',
        options: ['aₙ = a × rⁿ', 'aₙ = a + (n-1)d', 'aₙ = a × (n-1)d', 'aₙ = n + d'],
        correctAnswer: 1,
        explanation: 'The nth term of an AP is aₙ = a + (n-1)d where a = first term and d = common difference.',
        topic: 'Sequences'
      }
    ]
  },
  {
    lessonOrder: 10,
    title: 'Logarithms & Surds Quiz',
    passingScore: 60,
    questions: [
      {
        question: 'If 2³ = 8, then log₂(8) = ?',
        options: ['2', '3', '8', '4'],
        correctAnswer: 1,
        explanation: 'log₂(8) asks "2 raised to what power gives 8?" Since 2³ = 8, log₂(8) = 3.',
        topic: 'Logarithms'
      },
      {
        question: 'Simplify: log₁₀(25) + log₁₀(4)',
        options: ['1', '2', 'log₁₀(29)', 'log₁₀(100)'],
        correctAnswer: 1,
        explanation: 'Using the product law: log(25) + log(4) = log(25 × 4) = log(100) = 2.',
        topic: 'Logarithms'
      },
      {
        question: 'Simplify: √48',
        options: ['2√12', '4√3', '6√2', '3√4'],
        correctAnswer: 1,
        explanation: '√48 = √(16 × 3) = √16 × √3 = 4√3.',
        topic: 'Logarithms'
      },
      {
        question: 'To rationalize 5/√3, multiply by:',
        options: ['√3/√3', '3/3', '√3/3', '5/√3'],
        correctAnswer: 0,
        explanation: 'To rationalize, multiply by √3/√3 (which equals 1). Result: 5√3/3.',
        topic: 'Logarithms'
      },
      {
        question: 'What is log₅(1)?',
        options: ['5', '1', '0', 'undefined'],
        correctAnswer: 2,
        explanation: 'log of 1 to any base is always 0, because a⁰ = 1 for any a.',
        topic: 'Logarithms'
      }
    ]
  }
];

module.exports = quizzesByLessonOrder;
