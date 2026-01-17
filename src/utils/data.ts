export interface Broker {
  id: string;
  name: string;
  image: string;
  isPrimary?: boolean;
}

export const allBrokers: Broker[] = [
  { id: "zerodha", name: "Zerodha", image: "/images/zerodha.png" },
  { id: "groww", name: "Groww", image: "/images/groww.png" },
  { id: "angelone", name: "AngleOne", image: "/images/angelOne.png" },
  { id: "dhan", name: "Dhan", image: "/images/dhan.png" },
  { id: "kotak", name: "Kotak Neo", image: "/images/kotak.png" },
  { id: "icici", name: "ICICI Direct", image: "/images/icici.png" },
];
