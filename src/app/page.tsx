import { navItems } from "@/constants/navbar";
import { Card, CardActionArea, CardContent } from "@mui/material";
import Link from "next/link";
import Typography from "@mui/material/Typography";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {navItems.map(({ title, path, desc }) => (
        <Card
          key={path}
          sx={{ maxWidth: 345 }}
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
