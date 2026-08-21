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

// Schematic Map Coordinates for SVG rendering (Normalised canvas 1600 x 1120)
export const STATION_COORDINATES = {
  // Red Line (West to East, y: 140)
  'Rithala': { x: 100, y: 140 },
  'Rohini West': { x: 150, y: 140 },
  'Rohini East': { x: 200, y: 140 },
  'Pitam Pura': { x: 250, y: 140 },
  'Kohat Enclave': { x: 300, y: 140 },
  'Netaji Subhash Place': { x: 360, y: 140 },
  'Keshav Puram': { x: 420, y: 140 },
  'Kanhiya Nagar': { x: 480, y: 140 },
  'Shastri Nagar': { x: 540, y: 140 },
  'Inderlok': { x: 600, y: 180 },
  'Pratap Nagar': { x: 660, y: 140 },
  'Pul Bangash': { x: 720, y: 140 },
  'Tis Hazari': { x: 780, y: 140 },
  'Kashmere Gate': { x: 850, y: 240 },
  'Shastri Park': { x: 960, y: 140 },
  'Seelampur': { x: 1030, y: 140 },
  'Welcome': { x: 1100, y: 140 },
  'Delhi Shahdara': { x: 1170, y: 140 },
  'Mansarovar Park': { x: 1240, y: 140 },
  'Jhilmil': { x: 1310, y: 140 },
  'Dilshad Garden': { x: 1380, y: 140 },

  // Yellow Line (North to South, x: 850)
  'Jahangirpuri': { x: 850, y: 40 },
  'Adarsh Nagar': { x: 850, y: 68 },
  'Azadpur': { x: 850, y: 96 },
  'Model Town': { x: 850, y: 124 },
  'GTB Nagar': { x: 850, y: 152 },
  'Vishwa Vidyalaya': { x: 850, y: 180 },
  'Vidhan Sabha': { x: 850, y: 205 },
  'Civil Lines': { x: 850, y: 225 },
  'Chandni Chowk': { x: 850, y: 300 },
  'Chawri Bazar': { x: 850, y: 350 },
  'New Delhi': { x: 850, y: 400 },
  'Rajiv Chowk': { x: 850, y: 470 },
  'Patel Chowk': { x: 850, y: 530 },
  'Central Secretariat': { x: 850, y: 590 },
  'Udyog Bhawan': { x: 850, y: 640 },
  'Race Course': { x: 850, y: 680 },
  'Jor Bagh': { x: 850, y: 720 },
  'INA': { x: 850, y: 760 },
  'AIIMS': { x: 850, y: 800 },
  'Green Park': { x: 850, y: 840 },
  'Hauz Khas': { x: 850, y: 880 },
  'Malviya Nagar': { x: 850, y: 920 },
  'Saket': { x: 850, y: 955 },
  'Qutub Minar': { x: 850, y: 990 },
  'Chhatarpur': { x: 810, y: 1025 },
  'Sultanpur': { x: 765, y: 1045 },
  'Ghitorni': { x: 715, y: 1055 },
  'Arjan Garh': { x: 665, y: 1060 },
  'Guru Dronacharya': { x: 615, y: 1060 },
  'Sikandarpur': { x: 565, y: 1060 },
  'MG Road': { x: 515, y: 1060 },
  'IFFCO Chowk': { x: 465, y: 1060 },
  'HUDA City Centre': { x: 415, y: 1060 },

  // Blue Line (East to West, y: 470)
  'Noida City Centre': { x: 1560, y: 880 },
  'Noida Golf Course': { x: 1530, y: 840 },
  'Botanical Garden': { x: 1500, y: 800 },
  'Noida Sector 18': { x: 1460, y: 760 },
  'Noida Sector 16': { x: 1420, y: 720 },
  'Noida Sector 15': { x: 1380, y: 680 },
  'New Ashok Nagar': { x: 1340, y: 640 },
  'Mayur Vihar Extension': { x: 1300, y: 600 },
  'Mayur Vihar-I': { x: 1260, y: 560 },
  'Akshardham': { x: 1220, y: 520 },
  'Yamuna Bank': { x: 1160, y: 470 },
  'Indraprastha': { x: 1090, y: 470 },
  'Pragati Maidan': { x: 1030, y: 470 },
  'Mandi House': { x: 970, y: 470 },
  'Barakhamba Road': { x: 910, y: 470 },
  'R K Ashram Marg': { x: 800, y: 470 },
  'Jhandewalan': { x: 750, y: 470 },
  'Karol Bagh': { x: 700, y: 470 },
  'Rajendra Place': { x: 650, y: 470 },
  'Patel Nagar': { x: 600, y: 470 },
  'Shadipur': { x: 550, y: 470 },
  'Kirti Nagar': { x: 500, y: 470 },
  'Moti Nagar': { x: 450, y: 470 },
  'Ramesh Nagar': { x: 405, y: 470 },
  'Rajouri Garden': { x: 360, y: 470 },
  'Tagore Garden': { x: 315, y: 470 },
  'Subhash Nagar': { x: 270, y: 470 },
  'Janakpuri East': { x: 225, y: 470 },
  'Janakpuri West': { x: 180, y: 470 },
  'Uttam Nagar East': { x: 140, y: 505 },
  'Uttam Nagar West': { x: 110, y: 540 },
  'Nawada': { x: 90, y: 580 },
  'Dwarka Mor': { x: 80, y: 625 },
  'Dwarka': { x: 80, y: 670 },
  'Dwarka Sector 14': { x: 90, y: 715 },
  'Dwarka Sector 13': { x: 100, y: 760 },
  'Dwarka Sector 12': { x: 120, y: 800 },
  'Dwarka Sector 11': { x: 150, y: 840 },
  'Dwarka Sector 10': { x: 180, y: 870 },
  'Dwarka Sector 9': { x: 220, y: 890 },
  'Dwarka Sector 8': { x: 260, y: 900 },
  'Dwarka Sector 21': { x: 300, y: 900 },

  // Blue Line Extension (Vaishali)
  'Laxmi Nagar': { x: 1210, y: 430 },
  'Nirman Vihar': { x: 1260, y: 400 },
  'Preet Vihar': { x: 1310, y: 370 },
  'Karkarduma': { x: 1360, y: 340 },
  'Anand Vihar ISBT': { x: 1410, y: 320 },
  'Kaushambi': { x: 1460, y: 300 },
  'Vaishali': { x: 1510, y: 280 },

  // Green Line
  'Satguru Ramsingh Marg': { x: 525, y: 390 },
  'Ashok Park Main': { x: 550, y: 310 },
  'Punjabi Bagh East': { x: 490, y: 270 },
  'Shivaji Park': { x: 440, y: 270 },
  'Madipur': { x: 390, y: 270 },
  'Paschim Vihar East': { x: 340, y: 270 },
  'Paschim Vihar West': { x: 290, y: 270 },
  'Peera Garhi': { x: 240, y: 270 },
  'Udyog Nagar': { x: 190, y: 270 },
  'Surajmal Stadium': { x: 140, y: 270 },
  'Nangloi': { x: 95, y: 270 },
  'Nangloi Railway station': { x: 65, y: 270 },
  'Rajdhani Park': { x: 35, y: 270 },
  'Mundka': { x: 10, y: 270 },

  // Violet Line
  'Khan Market': { x: 910, y: 630 },
  'JLN Stadium': { x: 950, y: 670 },
  'Jangpura': { x: 980, y: 710 },
  'Lajpat Nagar': { x: 1010, y: 750 },
  'Moolchand': { x: 1040, y: 790 },
  'Kailash Colony': { x: 1070, y: 830 },
  'Nehru Place': { x: 1100, y: 870 },
  'Kalkaji Mandir': { x: 1130, y: 910 },
  'Govind Puri': { x: 1150, y: 950 },
  'Okhla': { x: 1170, y: 980 },
  'Jasola Apollo': { x: 1190, y: 1010 },
  'Sarita Vihar': { x: 1210, y: 1035 },
  'Mohan Estate': { x: 1230, y: 1055 },
  'Tughlakabad': { x: 1250, y: 1075 },
  'Badarpur': { x: 1270, y: 1090 },

  // Airport Express (Orange Line)
  'Shivaji Stadium': { x: 770, y: 430 },
  'Dhaula Kuan': { x: 630, y: 570 },
  'Delhi Aerocity': { x: 510, y: 710 },
  'Airport': { x: 410, y: 810 }
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
