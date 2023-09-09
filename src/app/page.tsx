import { navItems } from "@/constants/navbar";
import { Card, CardActionArea, CardContent, Grid } from "@mui/material";
import Link from "next/link";
import Typography from "@mui/material/Typography";

export default function Home() {
  return (
    // <main className='flex flex-wrap p-8 gap-6'>
    <Grid container spacing={4} p={4}>
      {navItems.map(({ title, path, desc }) => (
        <Grid item xs={12} sm={6} lg={4} xl={3} component={Link} href={path}>
          <Card variant="outlined" className="h-full">
            <CardActionArea className="h-full flex justify-start items-start">
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
        </Grid>
      ))}
    </Grid>
    // </main>
  );
}
