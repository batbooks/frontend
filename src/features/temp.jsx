import React, { useState, useRef, useEffect } from 'react';

// --- کامپوننت‌های آیکون ---
const HomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
);
const BookOpenIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
);
const UserIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
);
const SearchIcon = () => (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
);
const ReplyIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
);
const ClockIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
);


// --- کامپوننت‌های اصلی ---

// کامپوننت نوار ناوبری (Navbar)
const Navbar = () => {
    return (
        <header className="bg-sky-100/80 backdrop-blur-lg text-gray-900 p-4 shadow-md w-full z-20 sticky top-0">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-2xl font-bold text-blue-800">BatBooks</div>
                <ul className="hidden md:flex items-center space-x-8 space-x-reverse font-medium">
                    <li><a href="#" className="flex items-center gap-2 text-gray-600 hover:text-blue-800 transition-colors"><HomeIcon /> صفحه اصلی</a></li>
                    <li><a href="#" className="flex items-center gap-2 text-gray-600 hover:text-blue-800 transition-colors"><BookOpenIcon /> کتاب های من</a></li>
                    <li><a href="#" className="flex items-center gap-2 text-blue-800 border-b-2 border-blue-800 pb-1">پنل ارتباطی</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-blue-800 transition-colors">جستجوی کتاب</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-blue-800 transition-colors">ارتباط با ما</a></li>
                </ul>
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border-2 border-gray-400 cursor-pointer hover:border-blue-600 transition-colors"><UserIcon /></div>
            </div>
        </header>
    );
};

// کامپوننت کارت تاپیک گفتگو
const DiscussionTopicCard = ({ topic, animationDelay }) => {
    return (
        <div 
            className="bg-white/60 backdrop-blur-xl border border-gray-200/50 shadow-lg hover:shadow-sky-300/50 transition-all duration-300 rounded-2xl p-4 flex gap-4 animate-fade-in-up hover:scale-[1.02]"
            style={{ animationDelay }}
        >
            <img src={topic.imageUrl} alt={`[جلد کتاب ${topic.title}]`} className="w-24 h-48 object-cover rounded-lg shadow-md flex-shrink-0" />
            <div className="flex-1 flex flex-col">
                {/* بخش اصلی محتوا */}
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg text-gray-800">{topic.title}</h3>
                        {topic.tag && (
                            <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full flex-shrink-0">{topic.tag}</span>
                        )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1 mb-3">ایجاد شده در {topic.date}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{topic.description}</p>
                </div>
                {/* بخش پایینی کارت (اطلاعات متا) */}
                <div className="mt-4 pt-3 border-t border-gray-200/80 flex justify-between items-center text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                        <ReplyIcon />
                        <span>{topic.replies} پاسخ</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <ClockIcon />
                        <span>آخرین فعالیت: {topic.lastActivity}</span>
                    </div>
                    <img src={topic.authorAvatarUrl} alt="آواتار نویسنده" className="w-7 h-7 rounded-full ring-2 ring-white" />
                </div>
            </div>
        </div>
    );
};


// کامپوننت اصلی اپلیکیشن
export default function Temp() {
    // داده‌های نمونه برای تاپیک‌های گفتگو
    const sampleTopics = [
        { id: 1, title: "جستجو برای نجات", description: "در این تاپیک درباره بهترین ترجمه‌ها و تحلیل‌های کتاب 'جستجو برای نجات' صحبت می‌کنیم.", date: "۳۱ اردیبهشت ۱۴۰۴", tag: "READING", imageUrl: "https://placehold.co/200x300/c026d3/ffffff?text=Brave+New+World", replies: 23, lastActivity: "۵ دقیقه پیش", authorAvatarUrl: "https://placehold.co/40x40/7c3aed/ffffff?text=A" },
        { id: 2, title: "به سوی بی‌نهایت", description: "نظرات و دیدگاه‌های خود را در مورد مفاهیم علمی و فلسفی کتاب 'به سوی بی‌نهایت' به اشتراک بگذارید.", date: "۳۰ اردیبهشت ۱۴۰۴", tag: null, imageUrl: "https://placehold.co/200x300/be123c/ffffff?text=To+Infinity", replies: 12, lastActivity: "۱ ساعت پیش", authorAvatarUrl: "https://placehold.co/40x40/16a34a/ffffff?text=B" },
        { id: 3, title: "در جستجوی حقیقت", description: "بحث و گفتگو پیرامون شخصیت‌پردازی و سیر داستانی کتاب 'در جستجوی حقیقت'.", date: "۲۹ اردیبهشت ۱۴۰۴", tag: null, imageUrl: "https://placehold.co/200x300/9a3412/ffffff?text=I+Cant+Live+Without+Books", replies: 45, lastActivity: "دیروز", authorAvatarUrl: "https://placehold.co/40x40/ea580c/ffffff?text=C" },
        { id: 4, title: "خاطرات سرشار از دلتنگی", description: "اشتراک‌گذاری احساسات و برداشت‌های شخصی از مطالعه کتاب 'خاطرات سرشار از دلتنگی'.", date: "۲۸ اردیبهشت ۱۴۰۴", tag: null, imageUrl: "https://placehold.co/200x300/15803d/ffffff?text=There's+a+Million+Things", replies: 8, lastActivity: "۳ روز پیش", authorAvatarUrl: "https://placehold.co/40x40/0284c7/ffffff?text=D" },
    ];

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700&display=swap');
                body {
                    font-family: 'Vazirmatn', sans-serif;
                    background-color: #f0f9ff; /* bg-sky-50 */
                }
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.6s ease-out forwards;
                    opacity: 0; /* Start hidden */
                }
            `}</style>

            <div className="text-gray-800" dir="rtl">
                <Navbar />
                <main className="container mx-auto px-4 py-8">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">تالار گفتگو</h1>
                        <div className="relative w-full max-w-xs">
                            <input 
                                type="text" 
                                placeholder="جستجو در تاپیک‌ها..."
                                className="w-full bg-white/80 border border-gray-300 rounded-full py-2 pr-10 pl-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <SearchIcon />
                            </div>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {sampleTopics.map((topic, index) => (
                            <DiscussionTopicCard 
                                key={topic.id} 
                                topic={topic} 
                                animationDelay={`${index * 100}ms`}
                            />
                        ))}
                    </div>
                </main>
            </div>
        </>
    );
}
