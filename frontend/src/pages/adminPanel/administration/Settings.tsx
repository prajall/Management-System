import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ThemeContext, availableThemes } from "@/contexts/ThemeContext";
import { useContext, useState } from "react";

const Settings = () => {
  const [language, setLanguage] = useState("english");
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className="mx-auto flex gap-4 flex-col lg:flex-row w-full">
      <Card className="w-full lg:w-1/2 flex gap-4 items-center justify-between">
        <CardHeader>
          <CardTitle>Language</CardTitle>
          <CardDescription>Choose your preferred language</CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <Select
            value={language}
            onValueChange={(value) => {
              setLanguage(value);
            }}
          >
            <SelectTrigger className="">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="spanish">Spanish</SelectItem>
              <SelectItem value="french">French</SelectItem>
              <SelectItem value="german">German</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card className="w-full lg:w-1/2 flex gap-4 items-center justify-between">
        <CardHeader>
          <CardTitle>Theme</CardTitle>
          <CardDescription>Choose your preferred theme</CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <Select
            value={theme}
            onValueChange={(value) => {
              setTheme(value);
            }}
          >
            <SelectTrigger className="">
              <SelectValue placeholder="Select theme" className="mr-2" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(availableThemes).map((themeKey) => (
                <SelectItem key={themeKey} value={themeKey}>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full "
                      style={{
                        backgroundColor: availableThemes[themeKey].primary,
                      }}
                    />
                    {themeKey.charAt(0).toUpperCase() + themeKey.slice(1)}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
