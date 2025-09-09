export const translations = {
    en: {
        // Chat UI
        chatPlaceholder: "Ask me anything...",
        chatSendButton: "Send",
        chatVoiceButton: "Voice",
        chatMuteButton: "Mute",
        chatUnmuteButton: "Unmute",
        chatYou: "You",
        chatAgent: "Agent",

        // Search Section
        searchTitle: "Welcome to APK Real Estate",
        searchPlaceholder: "Type your property need — APK will handle the rest!",
        searchDescription: "Your trusted property partner in Bangkok. Discover premium properties and reserve your dream home today.",
        searchSubDescription: "Premium Properties • Trusted Service • Bangkok's Best",
        searchSuggestions: [
            "Suggest some 2 BHK property for rent under 2 lakh Baht",
            "What do you have for office rent with security near Nana",
            "I want to buy a 3 bedroom flat with gym and swimming pool",
        ],

        // Voice Module
        voiceTitle: "Hi, tell me what you need!",
        voiceSubtitle: "Speak your real estate need — APK will listen and help!",
        voiceDescription: "Tap to start/stop speaking.",
        voiceBackToText: "Back to Text",

        // Common UI
        close: "Close",
        back: "Back",
        loading: "Loading...",
        error: "Error",
        success: "Success",
    },
    th: {
        // Chat UI
        chatPlaceholder: "ถามอะไรก็ได้...",
        chatSendButton: "ส่ง",
        chatVoiceButton: "เสียง",
        chatMuteButton: "ปิดเสียง",
        chatUnmuteButton: "เปิดเสียง",
        chatYou: "คุณ",
        chatAgent: "เอเจนต์",

        // Search Section
        searchTitle: "ยินดีต้อนรับสู่ เอพีเคอสังหาริมทรัพย์",
        searchPlaceholder: "พิมพ์ความต้องการด้านอสังหาริมทรัพย์ของคุณ — APK จะจัดการให้!",
        searchDescription: "พันธมิตรอสังหาริมทรัพย์ที่คุณไว้วางใจในกรุงเทพฯ ค้นหาทรัพย์สินพรีเมียมและจองบ้านในฝันของคุณวันนี้.",
        searchSubDescription: "ทรัพย์สินพรีเมียม • บริการที่เชื่อถือได้ • อสังหาฯ กรุงเทพฯ",
        searchSuggestions: [
            "แนะนำบ้าน 2 ห้องนอนให้เช่าราคาไม่เกิน 2 แสนบาท",
            "ให้เช่าออฟฟิศพร้อมรปภ.แถวนานามีอะไรบ้าง",
            "ฉันต้องการซื้อแฟลต 3 ห้องนอนพร้อมห้องออกกำลังกายและสระว่ายน้ำ",
        ],

        // Voice Module
        voiceTitle: "สวัสดี บอกฉันว่าคุณต้องการอะไร!",
        voiceSubtitle: "พูดความต้องการด้านอสังหาริมทรัพย์ของคุณ — APK จะฟังและช่วยเหลือ!",
        voiceDescription: "กดค้างไมโครโฟนเพื่อเริ่มพูด หรือแตะเพื่อเริ่ม/หยุดการบันทึก",
        voiceBackToText: "กลับไปพิมพ์ข้อความ",

        // Common UI
        close: "ปิด",
        back: "กลับ",
        loading: "กำลังโหลด...",
        error: "ข้อผิดพลาด",
        success: "สำเร็จ",
    },
    zh: {
        // Chat UI
        chatPlaceholder: "问我任何问题...",
        chatSendButton: "发送",
        chatVoiceButton: "语音",
        chatMuteButton: "静音",
        chatUnmuteButton: "取消静音",
        chatYou: "您",
        chatAgent: "代理",

        // Search Section
        searchTitle: "欢迎来到 APK 房地产",
        searchPlaceholder: "输入您的房产需求 — APK 将处理其余一切！",
        searchDescription: "您在曼谷值得信赖的房产合作伙伴。发现优质房产，今天就预订您的梦想家园。",
        searchSubDescription: "优质房产 • 值得信赖的服务 • 曼谷最佳",
        searchSuggestions: [
            "推荐一些租金低于20万泰铢的2居室房产",
            "娜娜附近有什么带保安的办公室出租",
            "我想买一套带健身房和游泳池的3居室公寓",
        ],

        // Voice Module
        voiceTitle: "您好，告诉我您需要什么！",
        voiceSubtitle: "说出您的房地产需求 — APK 会倾听并帮助您！",
        voiceDescription: "按住麦克风开始说话，或点击开始/停止录音。",
        voiceBackToText: "返回文字输入",

        // Common UI
        close: "关闭",
        back: "返回",
        loading: "加载中...",
        error: "错误",
        success: "成功",
    },
};

export type TranslationKey = keyof typeof translations.en;
export type LanguageCode = keyof typeof translations;
