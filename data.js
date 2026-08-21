// Delhi Metro Route Finder - Classic Data Model

export const LINES = {
  blue: {
    id: 'blue',
    name: 'Blue Line',
    color: '#0072CE',
    textColor: '#ffffff',
    code: 'b',
    stations: [
      'Dwarka Sector 21', 'Dwarka Sector 8', 'Dwarka Sector 9', 'Dwarka Sector 10',
      'Dwarka Sector 11', 'Dwarka Sector 12', 'Dwarka Sector 13', 'Dwarka Sector 14',
      'Dwarka', 'Dwarka Mor', 'Nawada', 'Uttam Nagar West', 'Uttam Nagar East',
      'Janakpuri West', 'Janakpuri East', 'Subhash Nagar', 'Tagore Garden',
      'Rajouri Garden', 'Ramesh Nagar', 'Moti Nagar', 'Kirti Nagar', 'Shadipur',
      'Patel Nagar', 'Rajendra Place', 'Karol Bagh', 'Jhandewalan', 'R K Ashram Marg',
      'Rajiv Chowk', 'Barakhamba Road', 'Mandi House', 'Pragati Maidan', 'Indraprastha',
      'Yamuna Bank', 'Akshardham', 'Mayur Vihar-I', 'Mayur Vihar Extension',
      'New Ashok Nagar', 'Noida Sector 15', 'Noida Sector 16', 'Noida Sector 18',
      'Botanical Garden', 'Noida Golf Course', 'Noida City Centre'
    ]
  },
  bluext: {
    id: 'bluext',
    name: 'Blue Line Branch (Vaishali)',
    color: '#0072CE',
    textColor: '#ffffff',
    code: 'b',
    stations: [
      'Yamuna Bank', 'Laxmi Nagar', 'Nirman Vihar', 'Preet Vihar',
      'Karkarduma', 'Anand Vihar ISBT', 'Kaushambi', 'Vaishali'
    ]
  },
  yellow: {
    id: 'yellow',
    name: 'Yellow Line',
    color: '#F4B400',
    textColor: '#000000',
    code: 'y',
    stations: [
      'Jahangirpuri', 'Adarsh Nagar', 'Azadpur', 'Model Town', 'GTB Nagar',
      'Vishwa Vidyalaya', 'Vidhan Sabha', 'Civil Lines', 'Kashmere Gate',
      'Chandni Chowk', 'Chawri Bazar', 'New Delhi', 'Rajiv Chowk', 'Patel Chowk',
      'Central Secretariat', 'Udyog Bhawan', 'Race Course', 'Jor Bagh',
      'INA', 'AIIMS', 'Green Park', 'Hauz Khas', 'Malviya Nagar',
      'Saket', 'Qutub Minar', 'Chhatarpur', 'Sultanpur', 'Ghitorni', 'Arjan Garh',
      'Guru Dronacharya', 'Sikandarpur', 'MG Road', 'IFFCO Chowk', 'HUDA City Centre'
    ]
  },
  red: {
    id: 'red',
    name: 'Red Line',
    color: '#E31837',
    textColor: '#ffffff',
    code: 'r',
    stations: [
      'Rithala', 'Rohini West', 'Rohini East', 'Pitam Pura', 'Kohat Enclave',
      'Netaji Subhash Place', 'Keshav Puram', 'Kanhiya Nagar', 'Shastri Nagar',
      'Inderlok', 'Pratap Nagar', 'Pul Bangash', 'Tis Hazari', 'Kashmere Gate', 'Shastri Park',
      'Seelampur', 'Welcome', 'Delhi Shahdara', 'Mansarovar Park', 'Jhilmil', 'Dilshad Garden'
    ]
  },
  green: {
    id: 'green',
    name: 'Green Line',
    color: '#009A44',
    textColor: '#ffffff',
    code: 'g',
    stations: [
      'Inderlok', 'Ashok Park Main', 'Punjabi Bagh East',
      'Shivaji Park', 'Madipur', 'Paschim Vihar East', 'Paschim Vihar West',
      'Peera Garhi', 'Udyog Nagar', 'Surajmal Stadium', 'Nangloi',
      'Nangloi Railway station', 'Rajdhani Park', 'Mundka'
    ]
  },
  greenBranch: {
    id: 'greenBranch',
    name: 'Green Line Branch',
    color: '#009A44',
    textColor: '#ffffff',
    code: 'g',
    stations: [
      'Kirti Nagar', 'Satguru Ramsingh Marg', 'Ashok Park Main'
    ]
  },
  violet: {
    id: 'violet',
    name: 'Violet Line',
    color: '#702082',
    textColor: '#ffffff',
    code: 'v',
    stations: [
      'Central Secretariat', 'Khan Market', 'JLN Stadium', 'Jangpura',
      'Lajpat Nagar', 'Moolchand', 'Kailash Colony', 'Nehru Place', 'Kalkaji Mandir',
      'Govind Puri', 'Okhla', 'Jasola Apollo', 'Sarita Vihar', 'Mohan Estate',
      'Tughlakabad', 'Badarpur'
    ]
  },
  orange: {
    id: 'orange',
    name: 'Airport Express (Orange Line)',
    color: '#FF6F00',
    textColor: '#ffffff',
    code: 'o',
    stations: [
      'New Delhi', 'Shivaji Stadium', 'Dhaula Kuan', 'Delhi Aerocity', 'Airport', 'Dwarka Sector 21'
    ]
  }
};

// Schematic Map Coordinates for SVG rendering (Normalised canvas 1150 x 780)
export const STATION_COORDINATES = {
  // Red Line (West to East)
  'Rithala': { x: 90, y: 90 },
  'Rohini West': { x: 130, y: 90 },
  'Rohini East': { x: 170, y: 90 },
  'Pitam Pura': { x: 210, y: 90 },
  'Kohat Enclave': { x: 250, y: 90 },
  'Netaji Subhash Place': { x: 295, y: 90 },
  'Keshav Puram': { x: 340, y: 90 },
  'Kanhiya Nagar': { x: 380, y: 90 },
  'Shastri Nagar': { x: 420, y: 90 },
  'Inderlok': { x: 465, y: 120 },
  'Pratap Nagar': { x: 505, y: 90 },
  'Pul Bangash': { x: 545, y: 90 },
  'Tis Hazari': { x: 585, y: 90 },
  'Kashmere Gate': { x: 630, y: 120 },
  'Shastri Park': { x: 710, y: 90 },
  'Seelampur': { x: 760, y: 90 },
  'Welcome': { x: 810, y: 90 },
  'Delhi Shahdara': { x: 860, y: 90 },
  'Mansarovar Park': { x: 910, y: 90 },
  'Jhilmil': { x: 960, y: 90 },
  'Dilshad Garden': { x: 1010, y: 90 },

  // Yellow Line (North to South)
  'Jahangirpuri': { x: 630, y: 25 },
  'Adarsh Nagar': { x: 630, y: 45 },
  'Azadpur': { x: 630, y: 65 },
  'Model Town': { x: 630, y: 85 },
  'GTB Nagar': { x: 630, y: 95 },
  'Vishwa Vidyalaya': { x: 630, y: 102 },
  'Vidhan Sabha': { x: 630, y: 108 },
  'Civil Lines': { x: 630, y: 114 },
  'Chandni Chowk': { x: 630, y: 160 },
  'Chawri Bazar': { x: 630, y: 190 },
  'New Delhi': { x: 630, y: 220 },
  'Rajiv Chowk': { x: 630, y: 270 },
  'Patel Chowk': { x: 630, y: 320 },
  'Central Secretariat': { x: 630, y: 370 },
  'Udyog Bhawan': { x: 630, y: 410 },
  'Race Course': { x: 630, y: 440 },
  'Jor Bagh': { x: 630, y: 470 },
  'INA': { x: 630, y: 500 },
  'AIIMS': { x: 630, y: 530 },
  'Green Park': { x: 630, y: 560 },
  'Hauz Khas': { x: 630, y: 590 },
  'Malviya Nagar': { x: 630, y: 620 },
  'Saket': { x: 630, y: 645 },
  'Qutub Minar': { x: 630, y: 670 },
  'Chhatarpur': { x: 605, y: 695 },
  'Sultanpur': { x: 580, y: 715 },
  'Ghitorni': { x: 550, y: 730 },
  'Arjan Garh': { x: 520, y: 740 },
  'Guru Dronacharya': { x: 485, y: 745 },
  'Sikandarpur': { x: 450, y: 745 },
  'MG Road': { x: 415, y: 745 },
  'IFFCO Chowk': { x: 380, y: 745 },
  'HUDA City Centre': { x: 345, y: 745 },

  // Blue Line (East to West)
  'Noida City Centre': { x: 1040, y: 410 },
  'Noida Golf Course': { x: 1000, y: 410 },
  'Botanical Garden': { x: 960, y: 410 },
  'Noida Sector 18': { x: 920, y: 410 },
  'Noida Sector 16': { x: 880, y: 410 },
  'Noida Sector 15': { x: 840, y: 410 },
  'New Ashok Nagar': { x: 805, y: 395 },
  'Mayur Vihar Extension': { x: 775, y: 375 },
  'Mayur Vihar-I': { x: 745, y: 350 },
  'Akshardham': { x: 715, y: 320 },
  'Yamuna Bank': { x: 690, y: 270 },
  'Indraprastha': { x: 670, y: 270 },
  'Pragati Maidan': { x: 655, y: 270 },
  'Mandi House': { x: 645, y: 270 },
  'Barakhamba Road': { x: 638, y: 270 },
  'R K Ashram Marg': { x: 590, y: 270 },
  'Jhandewalan': { x: 550, y: 270 },
  'Karol Bagh': { x: 510, y: 270 },
  'Rajendra Place': { x: 470, y: 270 },
  'Patel Nagar': { x: 430, y: 270 },
  'Shadipur': { x: 390, y: 270 },
  'Kirti Nagar': { x: 350, y: 270 },
  'Moti Nagar': { x: 310, y: 270 },
  'Ramesh Nagar': { x: 270, y: 270 },
  'Rajouri Garden': { x: 230, y: 270 },
  'Tagore Garden': { x: 195, y: 270 },
  'Subhash Nagar': { x: 165, y: 290 },
  'Janakpuri East': { x: 140, y: 320 },
  'Janakpuri West': { x: 120, y: 350 },
  'Uttam Nagar East': { x: 105, y: 380 },
  'Uttam Nagar West': { x: 95, y: 415 },
  'Nawada': { x: 85, y: 450 },
  'Dwarka Mor': { x: 80, y: 485 },
  'Dwarka': { x: 80, y: 520 },
  'Dwarka Sector 14': { x: 90, y: 555 },
  'Dwarka Sector 13': { x: 105, y: 585 },
  'Dwarka Sector 12': { x: 125, y: 610 },
  'Dwarka Sector 11': { x: 150, y: 630 },
  'Dwarka Sector 10': { x: 180, y: 645 },
  'Dwarka Sector 9': { x: 210, y: 655 },
  'Dwarka Sector 8': { x: 240, y: 655 },
  'Dwarka Sector 21': { x: 275, y: 655 },

  // Blue Line Extension (Vaishali)
  'Laxmi Nagar': { x: 735, y: 240 },
  'Nirman Vihar': { x: 775, y: 220 },
  'Preet Vihar': { x: 815, y: 200 },
  'Karkarduma': { x: 855, y: 185 },
  'Anand Vihar ISBT': { x: 895, y: 175 },
  'Kaushambi': { x: 935, y: 170 },
  'Vaishali': { x: 975, y: 165 },

  // Green Line
  'Satguru Ramsingh Marg': { x: 380, y: 235 },
  'Ashok Park Main': { x: 410, y: 195 },
  'Punjabi Bagh East': { x: 375, y: 165 },
  'Shivaji Park': { x: 340, y: 165 },
  'Madipur': { x: 305, y: 165 },
  'Paschim Vihar East': { x: 270, y: 165 },
  'Paschim Vihar West': { x: 235, y: 165 },
  'Peera Garhi': { x: 200, y: 165 },
  'Udyog Nagar': { x: 165, y: 165 },
  'Surajmal Stadium': { x: 130, y: 165 },
  'Nangloi': { x: 95, y: 165 },
  'Nangloi Railway station': { x: 65, y: 165 },
  'Rajdhani Park': { x: 40, y: 165 },
  'Mundka': { x: 15, y: 165 },

  // Violet Line
  'Khan Market': { x: 685, y: 395 },
  'JLN Stadium': { x: 715, y: 430 },
  'Jangpura': { x: 740, y: 460 },
  'Lajpat Nagar': { x: 765, y: 490 },
  'Moolchand': { x: 785, y: 520 },
  'Kailash Colony': { x: 805, y: 550 },
  'Nehru Place': { x: 820, y: 580 },
  'Kalkaji Mandir': { x: 835, y: 610 },
  'Govind Puri': { x: 845, y: 640 },
  'Okhla': { x: 855, y: 670 },
  'Jasola Apollo': { x: 865, y: 700 },
  'Sarita Vihar': { x: 875, y: 725 },
  'Mohan Estate': { x: 885, y: 745 },
  'Tughlakabad': { x: 895, y: 760 },
  'Badarpur': { x: 905, y: 775 },

  // Airport Express (Orange Line)
  'Shivaji Stadium': { x: 575, y: 245 },
  'Dhaula Kuan': { x: 480, y: 380 },
  'Delhi Aerocity': { x: 410, y: 490 },
  'Airport': { x: 345, y: 575 }
};

// Tourist places from tourplace.txt
export const TOURIST_PLACES = [
  { name: 'India Gate', station: 'Central Secretariat', icon: '🏛️', tag: 'Monument', desc: 'War memorial on the Kartavya Path honoring Indian soldiers.' },
  { name: 'Red Fort', station: 'Chandni Chowk', icon: '🏰', tag: 'Mughal Heritage', desc: 'Iconic red sandstone fort complex of Mughal Emperors.' },
  { name: 'Qutab Minar', station: 'Qutub Minar', icon: '🗼', tag: 'UNESCO World Heritage', desc: 'World famous 73m-tall minaret built in 1192.' },
  { name: 'Lotus Temple', station: 'Kalkaji Mandir', icon: '🪷', tag: 'Spiritual', desc: 'Stunning flowerlike Baháʼí temple in white Greek marble.' },
  { name: 'Akshardham Temple', station: 'Akshardham', icon: '🛕', tag: 'Cultural Complex', desc: 'Grand spiritual temple campus displaying Vedic heritage.' },
  { name: 'Connaught Place', station: 'Rajiv Chowk', icon: '🛍️', tag: 'City Centre & Food', desc: 'Vibrant Georgian arcade with shopping, dining, and central park.' },
  { name: 'Gurdwara Bangla Sahib', station: 'Rajiv Chowk', icon: '✨', tag: 'Sikh Shrine', desc: 'Serene historic Sikh gurdwara with golden dome and holy Sarovar.' },
  { name: 'Jama Masjid', station: 'Chandni Chowk', icon: '🕌', tag: 'Historic Mosque', desc: 'Largest historic mosque in India built by Mughal emperor Shah Jahan.' },
  { name: 'Rashtrapati Bhavan', station: 'Central Secretariat', icon: '🇮🇳', tag: 'Presidential Estate', desc: 'Magnificent 340-room official residence of the President of India.' },
  { name: 'Sansad Bhavan', station: 'Central Secretariat', icon: '🏛️', tag: 'Parliament of India', desc: 'Heart of Indian democracy and national governance.' },
  { name: 'National Museum', station: 'Udyog Bhawan', icon: '🖼️', tag: 'Art & Relics', desc: 'Houses 200,000+ works of exquisite ancient Indian arts.' },
  { name: 'Purana Quila', station: 'Pragati Maidan', icon: '🏯', tag: 'Ancient Fort', desc: 'Sixth city of Delhi with monumental gates and boating lake.' },
  { name: 'Lodhi Gardens', station: 'Jor Bagh', icon: '🌳', tag: 'Heritage Park', desc: 'Green botanical park with 15th-century Sayyid & Lodhi tombs.' },
  { name: 'Safdarjung\'s Tomb', station: 'Jor Bagh', icon: '🏛️', tag: 'Garden Tomb', desc: 'Last monumental garden tomb of the Mughal empire with palm gardens.' },
  { name: 'National Rail Museum', station: 'Mandi House', icon: '🚂', tag: 'Rail Heritage', desc: 'Exciting outdoor museum of vintage locomotives and royal coaches.' },
  { name: 'Jantar Mantar', station: 'Patel Chowk', icon: '🔭', tag: 'Observatory', desc: '18th-century astronomical masonry instruments by Raja Jai Singh.' },
  { name: 'ISKCON Temple', station: 'Kalkaji Mandir', icon: '🕉️', tag: 'Hare Krishna Temple', desc: 'Architectural temple dedicated to Lord Krishna & Vedic arts.' },
  { name: 'Birla Mandir', station: 'R K Ashram Marg', icon: '🛕', tag: 'Hindu Temple', desc: 'Famous multi-tiered Laxminarayan Temple inaugurated by Gandhi.' },
  { name: 'National Zoological Park', station: 'Pragati Maidan', icon: '🐅', tag: 'Wildlife Zoo', desc: 'Sprawling green zoo along Purana Qila with diverse fauna.' },
  { name: 'Raj Ghat', station: 'Chandni Chowk', icon: '🕊️', tag: 'National Memorial', desc: 'Peaceful black marble memorial to Mahatma Gandhi with eternal flame.' },
  { name: 'Nizamuddin Dargah', station: 'JLN Stadium', icon: '🎶', tag: 'Sufi Shrine', desc: 'Centuries-old Sufi shrine famous for evening soulful Qawwali.' },
  { name: 'Salimgarh Fort', station: 'Kashmere Gate', icon: '🛡️', tag: 'Historic Fort', desc: 'Fortress built in 1546 by Salim Shah Suri on the Yamuna.' },
  { name: 'St. James\' Church', station: 'Kashmere Gate', icon: '⛪', tag: 'Anglican Church', desc: 'One of the oldest churches in Delhi, built by James Skinner.' },
  { name: 'Shanti Vana', station: 'Chandni Chowk', icon: '🌿', tag: 'Memorial Park', desc: 'Peaceful garden memorial dedicated to India\'s first Prime Minister.' }
];

// Initial Smart Cards from paisa.txt
export const INITIAL_SMART_CARDS = [
  { id: 100001, balance: 1000, holder: 'Harsh Kumar' },
  { id: 100002, balance: 750, holder: 'Classic Commuter' },
  { id: 100003, balance: 150, holder: 'Tourist Pass Card' },
  { id: 100004, balance: 50, holder: 'Student Special' }
];
