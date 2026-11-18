// The standardized list of service types. The map's filters are built from this list.
// To add a service type: add it to a group below, then use the exact same name in data/services.js.
const SERVICE_GROUPS = [
  {
    group: "Medications for opioid use",
    types: [
      { name: "Methadone treatment", description: "A daily medication that relieves withdrawal and cravings. It can only be given at licensed opioid treatment programs, usually with counseling." },
      { name: "Buprenorphine treatment", description: "A medication (often called Suboxone) that reduces cravings and withdrawal. Trained primary care providers can prescribe it, and it's filled at a pharmacy." },
      { name: "Naltrexone treatment", description: "A medication that blocks the effects of opioids. It is not itself an opioid." }
    ]
  },
  {
    group: "Treatment programs",
    types: [
      { name: "Treatment navigation / telehealth", description: "Staff or remote doctors who help people start treatment, including same-day or overnight prescriptions and rides to intake appointments." },
      { name: "Withdrawal management", description: "Supervised overnight care while a person withdraws from substances." },
      { name: "Residential treatment", description: "A live-in treatment program, including step-down programs for the stage after." }
    ]
  },
  {
    group: "Support",
    types: [
      { name: "Counseling", description: "One-on-one or group sessions with a counselor or therapist." },
      { name: "Behavioral health services", description: "Mental health and substance use care provided together." },
      { name: "Case management", description: "Help with housing, benefits, and connecting to other services." },
      { name: "Support groups", description: "Peer groups such as Narcotics Anonymous (NA) and Alcoholics Anonymous (AA)." },
      { name: "Drop-in / basic needs", description: "Walk-in centers offering meals, a place to rest, clothing, or other basic needs, often with staff who can connect you to services." }
    ]
  },
  {
    group: "Harm reduction and health care",
    types: [
      { name: "Syringe access", description: "Free sterile syringes, safer-use supplies, and safe disposal." },
      { name: "Naloxone (Narcan)", description: "The overdose-reversal medication, often with training on how to use it." },
      { name: "HIV / hepatitis C / STI testing and care", description: "Testing and treatment for HIV, hepatitis C, and other sexually transmitted infections." },
      { name: "Primary care / medical care", description: "General medical care, including nurse practitioners and street medicine." }
    ]
  }
];
