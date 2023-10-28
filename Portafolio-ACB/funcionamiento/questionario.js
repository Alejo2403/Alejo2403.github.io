function verificarRespuestas() {
    const respuestasCorrectas = {
        q1: "b",
        q2: "a",
        q3: "d",
        q4: "b",
        q5: "b",
        q6: "a",
        q7: "b",
        q8: "b",
        q9: "c"
    };

    let puntaje = 0;

    for (let pregunta in respuestasCorrectas) {
        const seleccion = document.querySelector(`input[name="${pregunta}"]:checked`);
        if (seleccion) {
            if (seleccion.value === respuestasCorrectas[pregunta]) {
                puntaje++;
            }
        }
    }

    const resultado = document.getElementById("resultado");
    resultado.innerHTML = `Tu puntaje es: ${puntaje} / 9`;
}