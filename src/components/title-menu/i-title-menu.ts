
export interface TitleMenuItem {
    action?: () => {},
    label?: string
};

export interface TitleMenuVM {
    menuItems: TitleMenuItem[]
};
