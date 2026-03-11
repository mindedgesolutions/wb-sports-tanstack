let user: UserProps | null = null;

export const userManager = {
  getUser(): UserProps | null {
    return user;
  },
  setUser(newUser: UserProps | null) {
    user = newUser;
  },
  clear() {
    user = null;
  },
};
