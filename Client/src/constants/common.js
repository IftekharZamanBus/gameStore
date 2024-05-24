// Export a constant object named IN_STOCK with properties YES and NO
export const IN_STOCK = {
    YES: "Y", // Represents the value for "In Stock"
    NO: "N"   // Represents the value for "Out of Stock"
}

export const BASE_URL = import.meta.env.VITE_WEB_API_URL;
export const USERS_URL = '/api/users';
export const GAMES_URL = '/api/games';