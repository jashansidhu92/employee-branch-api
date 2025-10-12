export interface Branch {
  id: number;
  name: string;
  address: string;
  phone: string;
}

export const branches: Branch[] = [
  {
    id: 1,
    name: "Vancouver Downtown Branch",
    address: "123 Main St, Vancouver, BC",
    phone: "604-555-0101",
  },
  {
    id: 2,
    name: "Edmonton Central Branch",
    address: "456 Jasper Ave, Edmonton, AB",
    phone: "780-555-0102",
  },
  {
    id: 3,
    name: "Winnipeg North Branch",
    address: "789 Portage Ave, Winnipeg, MB",
    phone: "204-555-0103",
  },
  {
    id: 4,
    name: "Toronto Financial Branch",
    address: "100 King St W, Toronto, ON",
    phone: "416-555-0104",
  },
];
