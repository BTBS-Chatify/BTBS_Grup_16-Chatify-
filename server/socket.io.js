
const socketIO = require('socket.io');

function initializeSocketIO(server) {
  const io = socketIO(server);

  io.on('connection', (socket) => {
    console.log('Bir kullanıcı bağlandı');

    // Kullanıcı bağlantısı kesildiğinde
    socket.on('disconnect', () => {
      console.log('Bir kullanıcı ayrıldı');
    });
  });
}

