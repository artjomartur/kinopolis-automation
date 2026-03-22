export async function onRequest() {
    const locations = [
        { name: 'Darmstadt: KINOPOLIS', slug: 'kp' },
        { name: 'Darmstadt: Citydome', slug: 'ca' },
        { name: 'Darmstadt: Rex', slug: 'rx' }
    ];
    
    return new Response(JSON.stringify(locations), {
        headers: { 'Content-Type': 'application/json' }
    });
}
