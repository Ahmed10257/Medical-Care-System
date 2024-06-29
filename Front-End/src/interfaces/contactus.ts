export interface User {
  _id: string;
  name: string;
  comments: string;
  createdAt: string;
  status?: "negative" | "positive" | "";
  email: string;
}
