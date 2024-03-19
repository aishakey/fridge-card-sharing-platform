import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const session = await getServerSession();

  if (!session) {
    redirect("/");
  }
  return <div>ProfilePage</div>;
};

export default ProfilePage;
