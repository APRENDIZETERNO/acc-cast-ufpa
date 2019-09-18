package br.ufpa.lades.accs.web.rest;

import br.ufpa.lades.accs.domain.Certificado;
import br.ufpa.lades.accs.repository.CertificadoRepository;
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
 * REST controller for managing {@link br.ufpa.lades.accs.domain.Certificado}.
 */
@RestController
@RequestMapping("/api")
public class CertificadoResource {

    private final Logger log = LoggerFactory.getLogger(CertificadoResource.class);

    private static final String ENTITY_NAME = "certificado";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CertificadoRepository certificadoRepository;

    public CertificadoResource(CertificadoRepository certificadoRepository) {
        this.certificadoRepository = certificadoRepository;
    }

    /**
     * {@code POST  /certificados} : Create a new certificado.
     *
     * @param certificado the certificado to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new certificado, or with status {@code 400 (Bad Request)} if the certificado has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/certificados")
    public ResponseEntity<Certificado> createCertificado(@RequestBody Certificado certificado) throws URISyntaxException {
        log.debug("REST request to save Certificado : {}", certificado);
        if (certificado.getId() != null) {
            throw new BadRequestAlertException("A new certificado cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Certificado result = certificadoRepository.save(certificado);
        return ResponseEntity.created(new URI("/api/certificados/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /certificados} : Updates an existing certificado.
     *
     * @param certificado the certificado to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated certificado,
     * or with status {@code 400 (Bad Request)} if the certificado is not valid,
     * or with status {@code 500 (Internal Server Error)} if the certificado couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/certificados")
    public ResponseEntity<Certificado> updateCertificado(@RequestBody Certificado certificado) throws URISyntaxException {
        log.debug("REST request to update Certificado : {}", certificado);
        if (certificado.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Certificado result = certificadoRepository.save(certificado);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, certificado.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /certificados} : get all the certificados.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of certificados in body.
     */
    @GetMapping("/certificados")
    public List<Certificado> getAllCertificados() {
        log.debug("REST request to get all Certificados");
        return certificadoRepository.findAll();
    }

    /**
     * {@code GET  /certificados/:id} : get the "id" certificado.
     *
     * @param id the id of the certificado to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the certificado, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/certificados/{id}")
    public ResponseEntity<Certificado> getCertificado(@PathVariable Long id) {
        log.debug("REST request to get Certificado : {}", id);
        Optional<Certificado> certificado = certificadoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(certificado);
    }

    /**
     * {@code DELETE  /certificados/:id} : delete the "id" certificado.
     *
     * @param id the id of the certificado to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/certificados/{id}")
    public ResponseEntity<Void> deleteCertificado(@PathVariable Long id) {
        log.debug("REST request to delete Certificado : {}", id);
        certificadoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
