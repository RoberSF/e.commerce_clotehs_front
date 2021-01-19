export interface IMenuUser {
    title: string
    submenu: ISubMenu
}

export interface ISubMenu {
    url: string
    label: string
    icon: string
}