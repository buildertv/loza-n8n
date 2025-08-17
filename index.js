module.exports = {
	ZaloFriendTrigger: require('./dist/nodes/ZaloFriendTrigger/ZaloFriendTrigger.node').ZaloFriendTrigger,
	ZaloMessageTrigger: require('./dist/nodes/ZaloMessageTrigger/ZaloMessageTrigger.node').ZaloMessageTrigger,
	ZaloLoginByQr: require('./dist/nodes/ZaloLoginByQr/ZaloLoginByQr.node').ZaloLoginByQr,
	ZaloSendMessage: require('./dist/nodes/ZaloSendMessage/ZaloSendMessage.node').ZaloSendMessage,
	ZaloGroup: require('./dist/nodes/ZaloGroup/ZaloGroup.node').ZaloGroup,
	ZaloUser: require('./dist/nodes/ZaloUser/ZaloUser.node').ZaloUser,
	ZaloGomTin: require('./dist/nodes/ZaloGomTin/ZaloGomTin.node').ZaloGomTin,
	ZaloDecrypt: require('./dist/nodes/ZaloDecrypt/ZaloDecrypt.node').ZaloDecrypt,
	ZaloGetSecretKey: require('./dist/nodes/ZaloGetSecretKey/ZaloGetSecretKey.node').ZaloGetSecretKey,
};
