import moment from "moment";

export const dataFormatedByCatergoryName = (data) => {
  const project = data.projectList;
  const images = data.imageList;
  const projList = [];

  const list = project.reduce((acc, val, ind) => {
    const imgs = [];
    images.forEach((el, i) => {
      if (el.projectID === val._id) {
        imgs.push(el);
      }
    });
    return acc.concat({ ...val, imgs });
  }, []);

  list.map((proj) => {
    if (!projList[proj.projectCategoryValue]) {
      projList[proj.projectCategoryValue] = [];
    }
    projList[proj.projectCategoryValue].push(proj);
  });
  return projList;
};

export const getImagesByDate = (img) => {
  const imgByDate = [];
  const sortedImageArray = img.sort(
    (a, b) =>
      new moment(b.updatedAt).valueOf() - new moment(a.updatedAt).valueOf(),
  );
  sortedImageArray.map((img) => {
    const dt = new moment(img.updatedAt).format("YYYY/DD/MM");
    if (!imgByDate[dt]) {
      imgByDate[dt] = [];
    }
    imgByDate[dt].push(img);
  });
  return imgByDate;
};
