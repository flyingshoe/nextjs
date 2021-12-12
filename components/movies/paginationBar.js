import { Select, Form, Pagination, Space, Card } from "antd";
const { Item } = Form;

const PaginationBar = ({
  pagination,
  setPagination,
  changePagination,
  form,
  totalCount,
}) => {
  return (
    <Card style={{ marginBottom: 20, background: "#eee" }}>
      <Form layout="inline" initialValues={pagination} form={form}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Item label="Sort By" name="sortBy">
            <Select
              onChange={changePagination}
              style={{ width: 200 }}
              options={[
                { label: "Title", value: "title" },
                { label: "Metacritic", value: "metacritic" },
                { label: "Rotten Tomatoes", value: "tomatoes.rotten" },
              ]}
            ></Select>
          </Item>

          <Item label="Sort Order" name="sortOrder">
            <Select
              onChange={changePagination}
              style={{ width: 100 }}
              options={[
                { label: "Asc", value: "asc" },
                { label: "Desc", value: "desc" },
              ]}
            ></Select>
          </Item>
          <Pagination
            onChange={(pageNo, pageSize) =>
              setPagination((oldData) => ({ ...oldData, pageNo, pageSize }))
            }
            size="small"
            total={totalCount}
            showSizeChanger
            showQuickJumper
          />
        </div>
      </Form>
    </Card>
  );
};

export default PaginationBar;
