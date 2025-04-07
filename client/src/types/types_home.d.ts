export interface CreateRoomModalProps {
  handleCreateGame: (name: string) => void;
  username: string;
  closeModal: () => void;
}
export type Game = { id: string; turn: string };

export interface TableRowsProps {
  games: Game[];
}
