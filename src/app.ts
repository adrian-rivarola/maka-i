import server from "./server";

const PORT: string | number = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`server running on port ${PORT}`));
