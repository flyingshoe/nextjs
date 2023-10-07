import { navItems } from "@/constants/navbar";
import { Card, CardActionArea, CardContent } from "@mui/material";
import Link from "next/link";
import Typography from "@mui/material/Typography";

export default function Home() {
  return (
    <main className="flex flex-col grow items-center justify-between sm:py-20 sm:px-8 py-8 px-4">
      {navItems.map(({ title, path, desc }) => (
        <Card
          key={path}
          className="max-w-sm"
          component={Link}
          href={path}
          variant="outlined"
        >
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h4" component="div">
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {desc}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </main>
  );
}
