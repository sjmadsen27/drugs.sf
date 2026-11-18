// Edit this file to add or update locations.
// Each entry needs: name, address, services, lat, lng. Optional: note (shown in the popup), approx.
// services must use the exact names from data/service-types.js. Use an empty list if not known yet.
// approx: true shows a note that the map pin is approximate. Remove it once you've confirmed the coordinates.
const SERVICES = [
  {
    "id": 1,
    "name": "Bayview Hunters Point Foundation",
    "address": "1625 Carroll Avenue, San Francisco, CA 94124",
    "services": [
      "Methadone treatment",
      "Buprenorphine treatment",
      "Behavioral health services"
    ],
    "lat": 37.72508,
    "lng": -122.39415
  },
  {
    "id": 2,
    "name": "BAART Programs",
    "address": "1111 Market Street, 1st Floor, San Francisco, CA 94103",
    "services": [
      "Methadone treatment",
      "Buprenorphine treatment",
      "Counseling"
    ],
    "lat": 37.779959,
    "lng": -122.412648
  },
  {
    "id": 3,
    "name": "OBIC Clinic",
    "address": "1380 Howard Street, 2nd Floor, San Francisco 94103",
    "services": [
      "Buprenorphine treatment"
    ],
    "lat": 37.774363,
    "lng": -122.414333
  },
  {
    "id": 4,
    "name": "San Francisco Drug Users' Union",
    "address": "172 Turk St, San Francisco, CA",
    "services": [
      "Syringe access",
      "Naloxone (Narcan)"
    ],
    "note": "Some sources list this address as 170 Turk St. Check current hours before you go.",
    "lat": 37.7836,
    "lng": -122.41
  },
  {
    "id": 5,
    "name": "San Francisco AIDS Foundation Syringe Access Services",
    "address": "117 6th St, San Francisco, CA 94103",
    "services": [
      "Syringe access",
      "Naloxone (Narcan)",
      "HIV / hepatitis C / STI testing and care",
      "Counseling",
      "Buprenorphine treatment",
      "Primary care / medical care"
    ],
    "note": "Also offers drug checking.",
    "lat": 37.7785,
    "lng": -122.407
  },
  {
    "id": 6,
    "name": "Strut",
    "address": "470 Castro Street, San Francisco, CA 94114",
    "services": [
      "Counseling",
      "Support groups",
      "HIV / hepatitis C / STI testing and care"
    ],
    "note": "Focuses on LGBTQ+ community members.",
    "lat": 37.761502,
    "lng": -122.435233
  },
  {
    "id": 7,
    "name": "Harm Reduction Therapy Center",
    "address": "21 Merlin St, San Francisco, CA 94107",
    "services": [
      "Counseling",
      "Behavioral health services",
      "Drop-in / basic needs"
    ],
    "lat": 37.7815,
    "lng": -122.405
  },
  {
    "id": 8,
    "name": "Sixth Street Self-Help Center",
    "address": "169 6th St, San Francisco, CA 94103",
    "services": [
      "Drop-in / basic needs",
      "Counseling",
      "Behavioral health services"
    ],
    "note": "The city has ended this center's contract. It is reported to close by Dec. 31, with services moving to the Tenderloin Self-Help Center at 146 Leavenworth St.",
    "lat": 37.778,
    "lng": -122.4065
  },
  {
    "id": 9,
    "name": "Hope Center",
    "address": "1089 Mission St, San Francisco, CA 94103",
    "services": [
      "Case management",
      "Primary care / medical care",
      "Drop-in / basic needs"
    ],
    "note": "Drop-in center for women who are survivors of exploitation and homelessness.",
    "lat": 37.7795,
    "lng": -122.41
  },
  {
    "id": 10,
    "name": "The Gubbio Project",
    "address": "1661 15th St, San Francisco, CA 94103",
    "services": [
      "Drop-in / basic needs"
    ],
    "note": "Offers daytime rest space, chaplaincy, supplies, and referrals. Also operates at 133 Golden Gate Ave.",
    "lat": 37.766507,
    "lng": -122.421221
  },
  {
    "id": 11,
    "name": "Homeless Youth Alliance",
    "address": "558 Clayton Street, San Francisco, CA",
    "services": [
      "Syringe access",
      "Naloxone (Narcan)",
      "HIV / hepatitis C / STI testing and care",
      "Primary care / medical care",
      "Buprenorphine treatment",
      "Case management",
      "Behavioral health services"
    ],
    "note": "Serves young people ages 13 to 29.",
    "lat": 37.769,
    "lng": -122.452
  },
  {
    "id": 12,
    "name": "St. Anthony Foundation",
    "address": "150 Golden Gate Ave, San Francisco, CA 94102",
    "services": [
      "Case management",
      "Drop-in / basic needs"
    ],
    "note": "The Social Work Center is listed at 121 Golden Gate Ave.",
    "lat": 37.781,
    "lng": -122.413
  },
  {
    "id": 13,
    "name": "BAART Turk",
    "address": "433 Turk St, San Francisco, CA 94102",
    "services": [
      "Methadone treatment",
      "Buprenorphine treatment",
      "Counseling",
      "Primary care / medical care",
      "Behavioral health services"
    ],
    "lat": 37.7828,
    "lng": -122.414,
    "approx": true
  },
  {
    "id": 14,
    "name": "Tom Waddell Urban Health Clinic",
    "address": "230 Golden Gate Ave, San Francisco, CA 94102",
    "services": [
      "Buprenorphine treatment",
      "Behavioral health services",
      "HIV / hepatitis C / STI testing and care",
      "Primary care / medical care",
      "Naloxone (Narcan)",
      "Syringe access"
    ],
    "lat": 37.7812,
    "lng": -122.4138,
    "approx": true
  },
  {
    "id": 15,
    "name": "GLIDE Harm Reduction (Syringe Access Services)",
    "address": "330 Ellis St (Taylor St side), San Francisco, CA 94102",
    "services": [
      "Syringe access",
      "Naloxone (Narcan)",
      "HIV / hepatitis C / STI testing and care",
      "Treatment navigation / telehealth",
      "Case management",
      "Support groups"
    ],
    "lat": 37.7847,
    "lng": -122.412,
    "approx": true
  },
  {
    "id": 16,
    "name": "San Francisco Community Health Center",
    "address": "730 Polk St, 4th Floor, San Francisco, CA 94109",
    "services": [
      "Treatment navigation / telehealth",
      "Counseling",
      "Support groups",
      "Naloxone (Narcan)",
      "HIV / hepatitis C / STI testing and care"
    ],
    "lat": 37.7835,
    "lng": -122.4185,
    "approx": true
  },
  {
    "id": 17,
    "name": "Chinatown Public Health Center",
    "address": "845 Jackson St, 4th Floor, San Francisco, CA 94133",
    "services": [
      "Primary care / medical care",
      "Behavioral health services"
    ],
    "note": "Listed at this address while the permanent site at 1490 Mason St is being renovated.",
    "lat": 37.7955,
    "lng": -122.409,
    "approx": true
  },
  {
    "id": 18,
    "name": "Chinatown/North Beach Mental Health Services",
    "address": "729 Filbert St, San Francisco, CA 94133",
    "services": [
      "Behavioral health services"
    ],
    "lat": 37.8003,
    "lng": -122.409,
    "approx": true
  }
];
