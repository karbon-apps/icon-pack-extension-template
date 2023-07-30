# Project Name
NAME="MyExtension"


echo "Preparing Enviroment and Intalling Dependencies"
yarn

echo "Delete Folders"
rm -r $NAME/
rm -r components/

echo "Creating Components..."
yarn ts-node app.ts

mkdir $NAME/
cp ./components/ ./$NAME/ -r
cp ./info.json ./$NAME/
cp ./logo.png ./$NAME/

echo "Compressing..."
zip -r $NAME.zip  $NAME
