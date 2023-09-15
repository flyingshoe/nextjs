import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
} from "@mui/material";
import Image from "next/image";
import { addComma } from "../../utils";
import { isToday, parse } from "date-fns";

const iconSize = 70;

export default function JobCard({ cardData: data }) {
  return (
    <Card
      style={
        isToday(parse(data.metadata.newPostingDate, "yyyy-MM-dd", new Date()))
          ? {
              boxShadow: "0 0 8px #F50",
            }
          : {}
      }
    >
      <CardActionArea
        component="a"
        target="_blank"
        href={data.metadata.jobDetailsUrl}
      >
        <CardHeader
          avatar={
            <Avatar
              variant="rounded"
              sx={{
                background: "transparent",
                boxShadow: "0 0 8px lightgrey",
                height: iconSize,
                width: iconSize,
              }}
            >
              <Image
                alt="Job Icon"
                style={{ height: "auto" }}
                width={iconSize}
                height={iconSize}
                src={
                  data.postedCompany.logoUploadPath ||
                  "data:image/png;base64,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"
                }
              ></Image>
            </Avatar>
          }
          title={data.postedCompany.name}
          subheader={data.title}
          classes={{
            root: "[overflow-wrap:anywhere]",
          }}
        ></CardHeader>
        <CardContent>
          <h2>
            {` $${addComma(data.salary.minimum)} - $${addComma(
              data.salary.maximum
            )} `}
          </h2>
          Posted: <b>{data.metadata.newPostingDate}</b>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
