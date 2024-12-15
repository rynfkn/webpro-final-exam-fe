import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="w-[15%] h-[20%]">
        <Card className="h-full flex flex-col items-center">
          <CardHeader className="text-xl">
            <CardTitle>Welcome!</CardTitle>
          </CardHeader>
          <CardContent className="w-[90%] flex flex-col items-center space-y-4">
            <Button className="w-full">
              <a href={"/auth/login"}>Login</a>
            </Button>
            <Button className="w-full">
              <a href={"/auth/register"}>Register</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
