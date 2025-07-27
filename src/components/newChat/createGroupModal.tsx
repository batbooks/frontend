// CreateGroupModal.tsx
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ImagePlus,
  Users,
  Search,
  Loader2,
  UserCheck,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface User {
  id: number;
  following: string;
  following_image: string | null;
  following_user_id: number;
  created_at: string;
}

interface Props {
  onClose: () => void;
  onGroupCreated: () => void;
  popUp2: boolean; // You don't seem to use this, consider removing it if unused
}

const CreateGroupModal: React.FC<Props> = ({ onClose, onGroupCreated }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [creatingGroup, setCreatingGroup] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Fetch users once on mount
  useEffect(() => {
    const fetchUsers = async () => {
      setLoadingUsers(true);
      setError(null);
      try {
        const res = await fetch("http://127.0.0.1:8000/user/following/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        if (!res.ok) throw new Error("خطا در دریافت کاربران");
        const data = await res.json();
        setUsers(data.results);
      } catch (e: any) {
        setError(e.message || "خطایی در دریافت کاربران رخ داد");
      } finally {
        setLoadingUsers(false);
      }
    };
    fetchUsers();
  }, []);

  // Generate image preview URL on image change
  useEffect(() => {
    if (!image) {
      setImagePreview(null);
      return;
    }
    const url = URL.createObjectURL(image);
    setImagePreview(url);
    return () => URL.revokeObjectURL(url);
  }, [image]);

  // Close modal on Escape or click outside
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // Filter users by search query
  const filteredUsers = users.filter((user) =>
    user.following.toLowerCase().includes(search.toLowerCase())
  );

  // Toggle user selection
  const toggleUserSelection = (id: number) => {
    setSelectedUserIds((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  // Handle image input change with validation
  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("فایل انتخابی باید تصویر باشد.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("حجم تصویر نباید بیشتر از 5 مگابایت باشد.");
      return;
    }
    setImage(file);
  };

  // Remove selected image
  const removeImage = () => {
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Create group API call
  const createGroup = async () => {
    setError(null);
    if (!name.trim()) {
      setError("نام گروه الزامی است.");
      return;
    }
    if (selectedUserIds.length === 0) {
      setError("حداقل یک عضو باید انتخاب شود.");
      return;
    }
    setCreatingGroup(true);
    const formData = new FormData();
    formData.append("name", name);
    if (image) formData.append("image", image);
    formData.append("members", selectedUserIds.join(","));
    console.log(selectedUserIds.join(","));

    try {
      const res = await fetch("http://127.0.0.1:8000/chat/group/create/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(
          errData?.message ||
            errData?.detail ||
            `خطا در ایجاد گروه (${res.status})`
        );
      }

      onGroupCreated();
      onClose();
    } catch (e: any) {
      setError(e.message || "خطایی در ایجاد گروه رخ داد.");
    } finally {
      setCreatingGroup(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4 mt-20"
        aria-modal="true"
        role="dialog"
      >
        <motion.div
          ref={modalRef}
          initial={{ scale: 0.95, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-xl max-w-lg w-full max-h-[80vh] overflow-y-auto p-6 space-y-6 shadow-2xl"
          dir="rtl"
          aria-labelledby="create-group-title"
        >
          {/* Header */}
          <div className="flex justify-between items-center border-b border-gray-300 pb-3">
            <h2
              id="create-group-title"
              className="text-xl font-semibold text-sky-700 flex items-center gap-2"
            >
              <Users size={24} />
              ایجاد گروه جدید
            </h2>
            <button
              onClick={onClose}
              disabled={creatingGroup}
              aria-label="بستن"
              className="text-gray-400 hover:text-gray-600 transition p-1 rounded-full hover:bg-gray-100 disabled:opacity-50"
            >
              <X size={24} />
            </button>
          </div>

          {/* Error message */}
          {error && (
            <div
              className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-md text-sm flex items-center gap-2"
              role="alert"
            >
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          {/* Group Name Input */}
          <div>
            <label htmlFor="groupName" className="block mb-1 font-medium">
              نام گروه <span className="text-red-500">*</span>
            </label>
            <input
              id="groupName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="مثال: تیم پروژه آلفا"
              disabled={creatingGroup}
              className="w-full p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-sky-500"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block mb-1 font-medium">
              تصویر گروه (اختیاری)
            </label>
            <div className="flex items-center gap-4">
              <div
                onClick={() => !creatingGroup && fileInputRef.current?.click()}
                onKeyDown={(e) => {
                  if ((e.key === "Enter" || e.key === " ") && !creatingGroup) {
                    fileInputRef.current?.click();
                  }
                }}
                tabIndex={0}
                role="button"
                className={`w-20 h-20 rounded-full border-2 border-dashed flex items-center justify-center cursor-pointer bg-gray-50 ${
                  imagePreview ? "border-sky-400" : "border-gray-300"
                }`}
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="پیش‌نمایش تصویر"
                    className="object-contain w-full h-full rounded-full"
                  />
                ) : (
                  <ImagePlus size={32} className="text-gray-400" />
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onImageChange}
                disabled={creatingGroup}
                aria-label="انتخاب تصویر گروه"
              />
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={creatingGroup}
                  className="px-4 py-2 border rounded-md text-sm bg-white hover:bg-gray-50"
                >
                  {image ? "تغییر تصویر" : "انتخاب تصویر"}
                </button>
                {image && (
                  <button
                    type="button"
                    onClick={removeImage}
                    disabled={creatingGroup}
                    className="px-3 py-1 text-xs text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md"
                  >
                    حذف تصویر
                  </button>
                )}
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF, WEBP. حداکثر 5 مگابایت.
                </p>
              </div>
            </div>
          </div>

          {/* User Search & List */}
          <div>
            <label htmlFor="userSearch" className="block mb-1 font-medium">
              جستجوی اعضا
            </label>
            <div className="relative">
              <input
                id="userSearch"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="جستجو بر اساس نام"
                disabled={creatingGroup}
                className="w-full pl-10 pr-3 py-2 border rounded-lg border-gray-300 focus:ring-2 focus:ring-sky-500"
              />
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
            <div className="max-h-48 overflow-auto mt-2 border border-gray-200 rounded-md">
              {loadingUsers && (
                <div className="flex justify-center p-4">
                  <Loader2 className="animate-spin text-sky-500" size={24} />
                </div>
              )}
              {!loadingUsers && filteredUsers.length === 0 && (
                <p className="text-center text-gray-500 p-4">
                  هیچ عضوی یافت نشد.
                </p>
              )}
              {!loadingUsers &&
                filteredUsers.map((user) => (
                  <label
                    key={user.following_user_id}
                    className="flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-100"
                  >
                    <input
                      type="checkbox"
                      checked={selectedUserIds.includes(user.following_user_id)}
                      onChange={() =>
                        toggleUserSelection(user.following_user_id)
                      }
                      disabled={creatingGroup}
                      aria-checked={selectedUserIds.includes(
                        user.following_user_id
                      )}
                      className="h-5 w-5 accent-sky-600 border-gray-300 rounded focus:ring-sky-500 focus:ring-2 focus:ring-offset-1 mr-4 transition duration-150 ease-in-out"
                    />
                    {user.following_image ? (
                      <img
                        src={user.following_image}
                        alt={user.following}
                        className="w-8 h-8 rounded-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <UserCheck size={20} className="text-gray-400" />
                    )}
                    <span className="truncate text-sm">{user.following}</span>
                  </label>
                ))}
            </div>
          </div>

          {/* Create Button */}
          <button
            type="button"
            onClick={createGroup}
            disabled={creatingGroup}
            className="w-full bg-sky-600 text-white p-3 rounded-md font-semibold hover:bg-sky-700 transition disabled:opacity-50"
          >
            {creatingGroup ? (
              <Loader2 className="inline animate-spin" size={20} />
            ) : (
              "ایجاد گروه"
            )}
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CreateGroupModal;
