import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import { apiCall } from "@/services/apiCall";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/formatDate";
const Profile = () => {
  const [user, setUser] = useState({});

  const fetchUser = async () => {
    try {
      const response = await apiCall("GET", "/auth/me");
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const getInitials = (str) => {
    if (!str) return "";
    return str
      .split(" ")
      .map((elt) => elt[0])
      .join("")
      .toUpperCase();
  };

  if (!user.full_name) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md space-y-6">
        <div className="flex flex-col items-center gap-4">
          <Avatar className="w-24 h-24">
            {user.avatarUrl ? (
              <AvatarImage src={user.avatarUrl} />
            ) : (
              <AvatarFallback className="text-2xl bg-brand-accent text-brand-base">
                {getInitials(user.full_name)}
              </AvatarFallback>
            )}
          </Avatar>

          <h2 className="text-2xl font-bold">{user.full_name}</h2>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-gray-600">{user.role}</p>
          <p className="text-gray-600">{user.status}</p>
          <p className="text-gray-600">
            Last login: {user.last_login ? formatDateTime(user.last_login) : "-"}
          </p>
        </div>

      </div>
    </div>
  );
};

export default Profile;
