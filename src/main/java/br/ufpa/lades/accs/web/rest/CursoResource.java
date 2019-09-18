package br.ufpa.lades.accs.web.rest;

import br.ufpa.lades.accs.domain.Curso;
import br.ufpa.lades.accs.repository.CursoRepository;
import br.ufpa.lades.accs.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link br.ufpa.lades.accs.domain.Curso}.
 */
@RestController
@RequestMapping("/api")
public class CursoResource {

    private final Logger log = LoggerFactory.getLogger(CursoResource.class);

    private static final String ENTITY_NAME = "curso";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CursoRepository cursoRepository;

    public CursoResource(CursoRepository cursoRepository) {
        this.cursoRepository = cursoRepository;
    }

    /**
     * {@code POST  /cursos} : Create a new curso.
     *
     * @param curso the curso to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new curso, or with status {@code 400 (Bad Request)} if the curso has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cursos")
    public ResponseEntity<Curso> createCurso(@RequestBody Curso curso) throws URISyntaxException {
        log.debug("REST request to save Curso : {}", curso);
        if (curso.getId() != null) {
            throw new BadRequestAlertException("A new curso cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Curso result = cursoRepository.save(curso);
        return ResponseEntity.created(new URI("/api/cursos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cursos} : Updates an existing curso.
     *
     * @param curso the curso to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated curso,
     * or with status {@code 400 (Bad Request)} if the curso is not valid,
     * or with status {@code 500 (Internal Server Error)} if the curso couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cursos")
    public ResponseEntity<Curso> updateCurso(@RequestBody Curso curso) throws URISyntaxException {
        log.debug("REST request to update Curso : {}", curso);
        if (curso.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Curso result = cursoRepository.save(curso);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, curso.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /cursos} : get all the cursos.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cursos in body.
     */
    @GetMapping("/cursos")
    public List<Curso> getAllCursos(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Cursos");
        return cursoRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /cursos/:id} : get the "id" curso.
     *
     * @param id the id of the curso to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the curso, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cursos/{id}")
    public ResponseEntity<Curso> getCurso(@PathVariable Long id) {
        log.debug("REST request to get Curso : {}", id);
        Optional<Curso> curso = cursoRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(curso);
    }

    /**
     * {@code DELETE  /cursos/:id} : delete the "id" curso.
     *
     * @param id the id of the curso to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cursos/{id}")
    public ResponseEntity<Void> deleteCurso(@PathVariable Long id) {
        log.debug("REST request to delete Curso : {}", id);
        cursoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
