export type ExerciseResponseDTO = {
  id?: string;
  user_id: string;
  content: string;
  created_at: Date;
  user: { name: string };
};

export type ExerciseRequestDTO = {
  user_id: string;
  content: string;
};
