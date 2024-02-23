interface User {
    _id: string;
    telegramid: string,
    first_name: string;
    last_name: string;
    username: string;
    language:string,
    is_bot: string
    role:string,
    from:string,

}
export interface EditUserProps {
    isOpen: boolean;
    handleClose: () => void;
    editedRow: User | null;
    setEditedRow: React.Dispatch<React.SetStateAction<User | null>>;
  }
  export interface DeleteUserProps {
    isOpen: boolean;
    handleClose: () => void;
    deletedItem: User | null;

  }