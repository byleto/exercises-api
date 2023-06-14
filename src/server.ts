import app from './app';

const PORT: Number = Number(process.env.NODE_DOCKER_PORT || 8081);

app.listen(PORT, (): void => console.log(`running on port ${PORT}`));
