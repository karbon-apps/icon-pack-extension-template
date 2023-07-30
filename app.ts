import * as fs from 'fs';
import { join } from 'path';

/** Read Images Folder */
fs.readdirSync(join(__dirname, 'images')).forEach((item) => {
	/* Create Components Folder */
	fs.mkdirSync(join(__dirname, 'components'), { recursive: true });

	/* Copy to Components Folder */
	fs.copyFileSync(
		join(__dirname, 'images', item),
		join(__dirname, 'components', item.replace('-', '_'))
	);

	/* Create Component Properties File */
	fs.writeFileSync(
		join(
			__dirname,
			'components',
			item.split('.')[0].replace('-', '_') + '.json'
		),
		`{"name" : "${item.split('.')[0].replace('-', '_')}"}`
	);

	let content = fs.readFileSync(join(__dirname, 'images', item), 'utf-8');

	content = content.replace(`width="24"`, '').replace(`height="24"`, '');

	fs.writeFileSync(
		join(
			__dirname,
			'components',
			item.split('.')[0].replace('-', '_') + '.jsx'
		),
		`
		const Icon = () => {
			return (
		
					${content}
			);
		};
		
		render(<Icon/>)
		
		`
	);
});
