export const waitAnimationRender = () =>
    new Promise<void>((resolve) => {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
            resolve();
            });
        });
    });