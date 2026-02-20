export interface Scheme {
  id: string;
  name: string;
  ministry: string;
  description: string;
  eligibility: string[];
  benefits: string[];
  applicationProcess: string[];
  documents: string[];
  contact: string;
  website?: string;
}

export const schemes: Scheme[] = [
  {
    id: 'pm-awas-yojana',
    name: 'Pradhan Mantri Awas Yojana - Gramin',
    ministry: 'Ministry of Rural Development',
    description:
      'PMAY-G aims to provide a pucca house with basic amenities to all houseless and those living in kutcha and dilapidated houses in rural areas by 2024.',
    eligibility: [
      'Houseless families or families living in kutcha houses',
      'Families with no pucca house in their name',
      'Annual household income below specified limit',
      'No family member should be a government employee',
    ],
    benefits: [
      'Financial assistance of ₹1.20 lakh in plain areas',
      'Financial assistance of ₹1.30 lakh in hilly states',
      'Assistance for construction of toilet',
      'Piped drinking water connection',
    ],
    applicationProcess: [
      'Visit the official PMAY-G website',
      'Fill the online application form',
      'Submit required documents',
      'Wait for verification by local authorities',
      'Receive approval and assistance in installments',
    ],
    documents: ['Aadhaar Card', 'Income Certificate', 'Caste Certificate (if applicable)', 'Bank Account Details'],
    contact: 'Toll-Free: 1800-11-6446',
    website: 'https://pmayg.nic.in/',
  },
  {
    id: 'pm-kisan',
    name: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    description:
      'PM-KISAN provides income support of ₹6,000 per year to all farmer families across the country in three equal installments.',
    eligibility: [
      'All landholding farmer families',
      'Cultivable land holding in their name',
      'Institutional landholders are excluded',
      'Farmers holding constitutional posts are excluded',
    ],
    benefits: [
      'Direct income support of ₹6,000 per year',
      'Amount transferred in three installments of ₹2,000 each',
      'Direct Benefit Transfer to bank accounts',
    ],
    applicationProcess: [
      'Visit PM-KISAN portal or nearest CSC',
      'Register with Aadhaar number',
      'Provide land ownership details',
      'Submit bank account information',
      'Verification by local revenue officials',
    ],
    documents: ['Aadhaar Card', 'Land Ownership Documents', 'Bank Account Details', 'Mobile Number'],
    contact: 'PM-KISAN Helpline: 155261 / 011-24300606',
    website: 'https://pmkisan.gov.in/',
  },
  {
    id: 'ayushman-bharat',
    name: 'Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana',
    ministry: 'Ministry of Health and Family Welfare',
    description:
      'AB-PMJAY provides health cover of ₹5 lakh per family per year for secondary and tertiary care hospitalization.',
    eligibility: [
      'Families identified in SECC 2011 database',
      'Families with specific deprivation criteria',
      'Occupational category households in rural areas',
      'No cap on family size or age',
    ],
    benefits: [
      'Health cover of ₹5 lakh per family per year',
      'Cashless treatment at empanelled hospitals',
      'Coverage for pre and post-hospitalization expenses',
      'Coverage for over 1,500 medical procedures',
    ],
    applicationProcess: [
      'Check eligibility on official website',
      'Visit nearest Ayushman Mitra or CSC',
      'Provide Aadhaar and family details',
      'Receive Ayushman Card',
      'Use card at empanelled hospitals',
    ],
    documents: ['Aadhaar Card', 'Ration Card', 'Mobile Number', 'Address Proof'],
    contact: 'Toll-Free: 14555',
    website: 'https://pmjay.gov.in/',
  },
  {
    id: 'pm-surya-ghar',
    name: 'PM Surya Ghar Muft Bijli Yojana',
    ministry: 'Ministry of New and Renewable Energy',
    description:
      'This scheme aims to provide free electricity to 1 crore households by installing rooftop solar panels with substantial subsidies.',
    eligibility: [
      'Residential households',
      'Own house with suitable roof space',
      'Electricity connection in applicant name',
      'No existing rooftop solar installation',
    ],
    benefits: [
      'Subsidy up to 60% for systems up to 2 kW',
      'Subsidy up to 40% for systems between 2-3 kW',
      'Free electricity generation for 25+ years',
      'Reduced electricity bills',
      'Environmental benefits',
    ],
    applicationProcess: [
      'Register on PM Surya Ghar portal',
      'Upload electricity bill and house documents',
      'Get feasibility approval',
      'Install solar panels through empanelled vendor',
      'Receive subsidy after installation and inspection',
    ],
    documents: [
      'Aadhaar Card',
      'Electricity Bill',
      'House Ownership Proof',
      'Bank Account Details',
      'Roof Photographs',
    ],
    contact: 'Helpline: 1800-180-3333',
    website: 'https://pmsuryaghar.gov.in/',
  },
  {
    id: 'mgnrega',
    name: 'Mahatma Gandhi National Rural Employment Guarantee Act',
    ministry: 'Ministry of Rural Development',
    description:
      'MGNREGA guarantees 100 days of wage employment in a financial year to rural households whose adult members volunteer to do unskilled manual work.',
    eligibility: [
      'Adult members of rural households',
      'Willing to do unskilled manual work',
      'Must register for job card',
      'Applicable only in rural areas',
    ],
    benefits: [
      'Guaranteed 100 days of employment per year',
      'Minimum wage as per state rates',
      'Work within 5 km of residence',
      'Unemployment allowance if work not provided',
    ],
    applicationProcess: [
      'Apply for job card at Gram Panchayat',
      'Submit application with photograph',
      'Receive job card within 15 days',
      'Apply for work when needed',
      'Receive wages within 15 days of work completion',
    ],
    documents: ['Aadhaar Card', 'Address Proof', 'Passport Size Photographs', 'Bank Account Details'],
    contact: 'Toll-Free: 1800-345-22-44',
    website: 'https://nrega.nic.in/',
  },
  {
    id: 'swachh-bharat',
    name: 'Swachh Bharat Mission - Gramin',
    ministry: 'Ministry of Jal Shakti',
    description:
      'SBM-G aims to achieve universal sanitation coverage and to put focus on sanitation and solid & liquid waste management.',
    eligibility: [
      'Rural households without toilet',
      'BPL and APL families',
      'Families identified by Gram Panchayat',
      'Must not have received toilet assistance before',
    ],
    benefits: [
      'Financial assistance of ₹12,000 for toilet construction',
      'Technical support for construction',
      'Awareness programs on sanitation',
      'Community sanitation complex support',
    ],
    applicationProcess: [
      'Apply through Gram Panchayat',
      'Fill application form',
      'Get approval from local authorities',
      'Construct toilet as per guidelines',
      'Receive assistance in installments after verification',
    ],
    documents: ['Aadhaar Card', 'BPL/APL Card', 'Bank Account Details', 'Address Proof'],
    contact: 'Helpline: 1800-11-0007',
    website: 'https://swachhbharatmission.gov.in/',
  },
  {
    id: 'digital-india',
    name: 'Digital India Programme',
    ministry: 'Ministry of Electronics and Information Technology',
    description:
      'Digital India aims to transform India into a digitally empowered society and knowledge economy through digital infrastructure and digital literacy.',
    eligibility: [
      'All citizens of India',
      'Special focus on rural areas',
      'Educational institutions',
      'Government departments',
    ],
    benefits: [
      'Digital infrastructure development',
      'Digital literacy programs',
      'E-governance services',
      'Digital payment systems',
      'Internet connectivity in rural areas',
    ],
    applicationProcess: [
      'Access services through official portal',
      'Register for digital literacy programs at CSC',
      'Avail e-governance services online',
      'Participate in skill development programs',
    ],
    documents: ['Aadhaar Card', 'Mobile Number', 'Email ID (optional)'],
    contact: 'Helpline: 1800-3000-3468',
    website: 'https://digitalindia.gov.in/',
  },
  {
    id: 'pm-ujjwala',
    name: 'Pradhan Mantri Ujjwala Yojana',
    ministry: 'Ministry of Petroleum and Natural Gas',
    description:
      'PMUY provides LPG connections to women from Below Poverty Line (BPL) households to ensure universal coverage of cooking gas.',
    eligibility: [
      'Women from BPL households',
      'Age 18 years or above',
      'No LPG connection in household',
      'SECC 2011 beneficiaries',
    ],
    benefits: [
      'Free LPG connection',
      'Financial assistance for first refill and stove',
      'EMI facility for stove and regulator',
      'Clean cooking fuel',
    ],
    applicationProcess: [
      'Visit nearest LPG distributor',
      'Fill PMUY application form',
      'Submit required documents',
      'Get connection installed at home',
      'Receive subsidy directly',
    ],
    documents: ['Aadhaar Card', 'BPL Card/Certificate', 'Bank Account Details', 'Address Proof', 'Photograph'],
    contact: 'Toll-Free: 1906',
    website: 'https://www.pmuy.gov.in/',
  },
];
