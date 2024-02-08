// Define constants related to stock availability
const IN_STOCK = {
    YES: "Y", // Indicates that the item is in stock
    NO: "N"   // Indicates that the item is not in stock
}

// Define constants related to user status
const STATUS = {
    ACTIVE: "Y",   // Indicates that the user account is active
    INACTIVE: "N"  // Indicates that the user account is inactive
}

const ROLE = {
    ADMIN: "admin",
    USER: "user"
}

// Export the defined constants for use in other parts of your application
module.exports = { IN_STOCK, STATUS, ROLE };
