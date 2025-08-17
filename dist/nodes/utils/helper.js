"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveImage = saveImage;
exports.removeImage = removeImage;
exports.saveVideo = saveVideo;
exports.removeVideo = removeVideo;
exports.saveAudio = saveAudio;
exports.removeAudio = removeAudio;
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
async function saveImage(url) {
    try {
        let n8nUserFolder;
        if (process.env.N8N_USER_FOLDER) {
            n8nUserFolder = process.env.N8N_USER_FOLDER;
        }
        else {
            n8nUserFolder = path_1.default.join(os_1.default.homedir(), '.n8n');
        }
        const dataStoragePath = path_1.default.join(n8nUserFolder, 'temp_files');
        const fs = require('fs');
        if (!fs.existsSync(dataStoragePath)) {
            fs.mkdirSync(dataStoragePath, { recursive: true });
        }
        const timestamp = Date.now();
        const imgPath = path_1.default.join(dataStoragePath, `temp-${timestamp}.png`);
        const { data } = await axios_1.default.get(url, { responseType: "arraybuffer" });
        fs.writeFileSync(imgPath, Buffer.from(data, "utf-8"));
        return imgPath;
    }
    catch (error) {
        console.error(error);
        return null;
    }
}
function removeImage(imgPath) {
    try {
        fs_1.default.unlinkSync(imgPath);
    }
    catch (error) {
        console.error(error);
    }
}
async function saveVideo(url) {
    try {
        const timestamp = Date.now();
        const videoPath = `temp-${timestamp}.mp4`;
        const { data } = await axios_1.default.get(url, { responseType: "arraybuffer" });
        fs_1.default.writeFileSync(videoPath, Buffer.from(data, "utf-8"));
        return videoPath;
    }
    catch (error) {
        console.error(error);
        return null;
    }
}
function removeVideo(videoPath) {
    try {
        fs_1.default.unlinkSync(videoPath);
    }
    catch (error) {
        console.error(error);
    }
}
async function saveAudio(url) {
    try {
        const timestamp = Date.now();
        const audioPath = `temp-${timestamp}.wav`;
        const { data } = await axios_1.default.get(url, { responseType: "arraybuffer" });
        fs_1.default.writeFileSync(audioPath, Buffer.from(data, "utf-8"));
        return audioPath;
    }
    catch (error) {
        console.error(error);
        return null;
    }
}
function removeAudio(audioPath) {
    try {
        fs_1.default.unlinkSync(audioPath);
    }
    catch (error) {
        console.error(error);
    }
}
//# sourceMappingURL=helper.js.map