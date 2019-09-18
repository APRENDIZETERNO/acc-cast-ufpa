package br.ufpa.lades.accs.web.rest;

import br.ufpa.lades.accs.domain.TurmaACC;
import br.ufpa.lades.accs.repository.TurmaACCRepository;
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
 * REST controller for managing {@link br.ufpa.lades.accs.domain.TurmaACC}.
 */
@RestController
@RequestMapping("/api")
public class TurmaACCResource {

    private final Logger log = LoggerFactory.getLogger(TurmaACCResource.class);

    private static final String ENTITY_NAME = "turmaACC";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TurmaACCRepository turmaACCRepository;

    public TurmaACCResource(TurmaACCRepository turmaACCRepository) {
        this.turmaACCRepository = turmaACCRepository;
    }

    /**
     * {@code POST  /turma-accs} : Create a new turmaACC.
     *
     * @param turmaACC the turmaACC to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new turmaACC, or with status {@code 400 (Bad Request)} if the turmaACC has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/turma-accs")
    public ResponseEntity<TurmaACC> createTurmaACC(@RequestBody TurmaACC turmaACC) throws URISyntaxException {
        log.debug("REST request to save TurmaACC : {}", turmaACC);
        if (turmaACC.getId() != null) {
            throw new BadRequestAlertException("A new turmaACC cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TurmaACC result = turmaACCRepository.save(turmaACC);
        return ResponseEntity.created(new URI("/api/turma-accs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /turma-accs} : Updates an existing turmaACC.
     *
     * @param turmaACC the turmaACC to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated turmaACC,
     * or with status {@code 400 (Bad Request)} if the turmaACC is not valid,
     * or with status {@code 500 (Internal Server Error)} if the turmaACC couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/turma-accs")
    public ResponseEntity<TurmaACC> updateTurmaACC(@RequestBody TurmaACC turmaACC) throws URISyntaxException {
        log.debug("REST request to update TurmaACC : {}", turmaACC);
        if (turmaACC.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TurmaACC result = turmaACCRepository.save(turmaACC);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, turmaACC.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /turma-accs} : get all the turmaACCS.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of turmaACCS in body.
     */
    @GetMapping("/turma-accs")
    public List<TurmaACC> getAllTurmaACCS() {
        log.debug("REST request to get all TurmaACCS");
        return turmaACCRepository.findAll();
    }

    /**
     * {@code GET  /turma-accs/:id} : get the "id" turmaACC.
     *
     * @param id the id of the turmaACC to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the turmaACC, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/turma-accs/{id}")
    public ResponseEntity<TurmaACC> getTurmaACC(@PathVariable Long id) {
        log.debug("REST request to get TurmaACC : {}", id);
        Optional<TurmaACC> turmaACC = turmaACCRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(turmaACC);
    }

    /**
     * {@code DELETE  /turma-accs/:id} : delete the "id" turmaACC.
     *
     * @param id the id of the turmaACC to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/turma-accs/{id}")
    public ResponseEntity<Void> deleteTurmaACC(@PathVariable Long id) {
        log.debug("REST request to delete TurmaACC : {}", id);
        turmaACCRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
