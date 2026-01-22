ActionCable.server.config.cable = {
  adapter: :redis,
  url: ENV.fetch("REDIS_URL") { "redis://localhost:6379/1" }
}
