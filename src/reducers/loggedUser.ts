export const loggedUser = (prevState: Uuid | null = null, action: Action): Uuid | null => {
    switch (action.type) {
        default:
            return prevState;
    }
};
