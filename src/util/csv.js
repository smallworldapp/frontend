
/**
 * Parse a CSV file from a data transfer
 * @param {*} dataTransfer
 * @return {Promise<string[]>}
 */
export function parse(dataTransfer) {
    return new Promise((resolve) => {
        let reader = new FileReader();
        reader.onload = (e) => {
            let text = reader.result.trim();
            let lines = text.split(/\n/);

            let csv = lines.map((line) => line.split(',').map((cell) => cell.trim()));
            resolve(csv);
        };
        reader.readAsText(dataTransfer.files[0]);
    });
}
