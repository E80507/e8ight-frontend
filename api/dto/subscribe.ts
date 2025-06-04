export interface Subscribe {
  email: string;
}

export interface SubscribeResponse {
  message: string;
  data: {
    email: string;
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };
}
