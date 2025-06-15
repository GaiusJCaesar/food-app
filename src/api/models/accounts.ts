export type AccountPut = {
  name: Account["name"];
  userId: Account["userId"];
};

export type Account = {
  id: string;
  createdAt: string;
  name: string;
  contacts: string[];
  userId: string;
};
