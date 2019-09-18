package br.ufpa.lades.accs.web.rest;

import br.ufpa.lades.accs.domain.TipoCertificado;
import br.ufpa.lades.accs.repository.TipoCertificadoRepository;
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
 * REST controller for managing {@link br.ufpa.lades.accs.domain.TipoCertificado}.
 */
@RestController
@RequestMapping("/api")
public class TipoCertificadoResource {

    private final Logger log = LoggerFactory.getLogger(TipoCertificadoResource.class);

    private static final String ENTITY_NAME = "tipoCertificado";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TipoCertificadoRepository tipoCertificadoRepository;

    public TipoCertificadoResource(TipoCertificadoRepository tipoCertificadoRepository) {
        this.tipoCertificadoRepository = tipoCertificadoRepository;
    }

    /**
     * {@code POST  /tipo-certificados} : Create a new tipoCertificado.
     *
     * @param tipoCertificado the tipoCertificado to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tipoCertificado, or with status {@code 400 (Bad Request)} if the tipoCertificado has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tipo-certificados")
    public ResponseEntity<TipoCertificado> createTipoCertificado(@RequestBody TipoCertificado tipoCertificado) throws URISyntaxException {
        log.debug("REST request to save TipoCertificado : {}", tipoCertificado);
        if (tipoCertificado.getId() != null) {
            throw new BadRequestAlertException("A new tipoCertificado cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoCertificado result = tipoCertificadoRepository.save(tipoCertificado);
        return ResponseEntity.created(new URI("/api/tipo-certificados/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tipo-certificados} : Updates an existing tipoCertificado.
     *
     * @param tipoCertificado the tipoCertificado to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoCertificado,
     * or with status {@code 400 (Bad Request)} if the tipoCertificado is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tipoCertificado couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tipo-certificados")
    public ResponseEntity<TipoCertificado> updateTipoCertificado(@RequestBody TipoCertificado tipoCertificado) throws URISyntaxException {
        log.debug("REST request to update TipoCertificado : {}", tipoCertificado);
        if (tipoCertificado.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TipoCertificado result = tipoCertificadoRepository.save(tipoCertificado);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, tipoCertificado.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tipo-certificados} : get all the tipoCertificados.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tipoCertificados in body.
     */
    @GetMapping("/tipo-certificados")
    public List<TipoCertificado> getAllTipoCertificados() {
        log.debug("REST request to get all TipoCertificados");
        return tipoCertificadoRepository.findAll();
    }

    /**
     * {@code GET  /tipo-certificados/:id} : get the "id" tipoCertificado.
     *
     * @param id the id of the tipoCertificado to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tipoCertificado, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tipo-certificados/{id}")
    public ResponseEntity<TipoCertificado> getTipoCertificado(@PathVariable Long id) {
        log.debug("REST request to get TipoCertificado : {}", id);
        Optional<TipoCertificado> tipoCertificado = tipoCertificadoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tipoCertificado);
    }

    /**
     * {@code DELETE  /tipo-certificados/:id} : delete the "id" tipoCertificado.
     *
     * @param id the id of the tipoCertificado to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tipo-certificados/{id}")
    public ResponseEntity<Void> deleteTipoCertificado(@PathVariable Long id) {
        log.debug("REST request to delete TipoCertificado : {}", id);
        tipoCertificadoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
